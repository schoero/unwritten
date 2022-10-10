import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { assert } from "vitest";

import { compile } from "../compiler/index.js";
import { createConfig } from "../config/index.js";
import { disableLog } from "../log/index.js";
import { getEntryFileSymbolFromProgram, parse } from "../parser/index.js";
import { APIOptions } from "../types/options.js";
import { Renderer } from "../types/renderer.js";
import { validateRenderer } from "../utils/general.js";


export async function docCreator(entryFilePath: string, options?: APIOptions) {

  const absoluteEntryFilePath = resolve(entryFilePath);


  //-- Silence output

  if(options?.silent === true){
    disableLog();
  }


  //-- Get renderer

  let renderer: Renderer | undefined;

  if(options?.renderer === undefined || options.renderer === "markdown"){
    renderer = validateRenderer(await import("../renderer/markup/markdown/index.js"));
  } else if(options.renderer === "html"){
    renderer = validateRenderer(await import("../renderer/markup/html/index.js"));
  } else if(typeof options.renderer === "string"){
    renderer = validateRenderer(await import(options.renderer));
  } else if(typeof options.renderer === "object"){
    renderer = validateRenderer(options.renderer);
  }

  assert(renderer, "Invalid renderer");


  //-- Compile, parse and render

  const { checker, program } = compile(absoluteEntryFilePath, options?.tsconfig);

  const context = createContext(program, checker);
  const config = createConfig(options?.config);

  const entryFileSymbol = getEntryFileSymbolFromProgram(program);
  const parsedSymbols = parse({ config, ctx: context }, entryFileSymbol);
  const renderedSymbols = renderer.render({ config }, parsedSymbols);


  //-- Write output to file

  const fileExtension = renderer.fileExtension;
  const outputPath = options?.output ?? `./docs/api${fileExtension}`;
  const absoluteOutputDir = resolve(dirname(outputPath));

  if(existsSync(absoluteOutputDir) === false){
    mkdirSync(absoluteOutputDir, { recursive: true });
  }

  writeFileSync(outputPath, renderedSymbols);

  return parsedSymbols;

}