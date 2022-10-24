import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { compile } from "../compiler/index.js";
import { createContext as createCompilerContext } from "../compiler/utils/context.js";
import { createConfig as createRenderConfig } from "../config/index.js";
import { disableLog } from "../log/index.js";
import { getEntryFileSymbolFromProgram, parse } from "../parser/index.js";
import { getRenderer } from "../renderer/index.js";
import { createContext as createRenderContext } from "../renderer/utils/context.js";
import { APIOptions } from "../types/options.js";


export async function docCreator(entryFilePath: string, options?: APIOptions) {

  const absoluteEntryFilePath = resolve(entryFilePath);


  //-- Silence output

  if(options?.silent === true){
    disableLog();
  }


  //-- Compile

  const { checker, program } = compile(absoluteEntryFilePath, options?.tsconfig);


  //-- Get renderer

  const renderer = await getRenderer(options?.renderer);


  //-- Create config and contexts

  const config = createRenderConfig(options?.config);
  const compilerContext = createCompilerContext(checker, config);
  const renderContext = createRenderContext(renderer, config);


  //-- Parse and render

  const entryFileSymbol = getEntryFileSymbolFromProgram(compilerContext, program);
  const parsedSymbols = parse(compilerContext, entryFileSymbol);
  const renderedSymbols = renderer.render(renderContext, parsedSymbols);


  //-- Write output to file

  const fileExtension = renderer.fileExtension;
  const outputPath = options?.output ?? `./docs/api${ fileExtension}`;
  const absoluteOutputDir = resolve(dirname(outputPath));

  if(existsSync(absoluteOutputDir) === false){
    mkdirSync(absoluteOutputDir, { recursive: true });
  }

  writeFileSync(outputPath, renderedSymbols);

  return parsedSymbols;

}