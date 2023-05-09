import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { compile } from "unwritten:compiler:node.js";
import { createConfig } from "unwritten:config/index.js";
import { interpret } from "unwritten:interpreter:ast/index.js";
import { createContext as createInterpreterContext } from "unwritten:interpreter:utils/context.js";
import { getEntryFileSymbolFromProgram } from "unwritten:interpreter:utils/ts.js";
import { getRenderer } from "unwritten:renderer:index.js";
import { createContext as createRenderContext } from "unwritten:renderer:utils/context.js";
import { createContext as createDefaultContext } from "unwritten:utils:context.js";

import type { APIOptions } from "unwritten:type-definitions/options.d.js";


export async function unwritten(entryFilePath: string, options?: APIOptions) {

  const absoluteEntryFilePath = resolve(entryFilePath);


  //-- Logger

  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:logger/index.js");
  const defaultContext = createDefaultContext(logger);


  //-- Compile

  const { checker, program } = compile(defaultContext, absoluteEntryFilePath, options?.tsconfig);


  //-- Interpret

  const config = await createConfig(defaultContext, options?.config);
  const interpreterContext = createInterpreterContext(defaultContext, checker, config);
  const entryFileSymbol = getEntryFileSymbolFromProgram(interpreterContext, program);
  const interpretedSymbols = interpret(interpreterContext, entryFileSymbol);


  //-- Render

  const renderer = await getRenderer(options?.renderer);
  const renderContext = createRenderContext(defaultContext, renderer, config);
  const renderedSymbols = renderer.render(renderContext, interpretedSymbols);


  //-- Write output to file

  const fileExtension = renderer.fileExtension;
  const outputPath = options?.output ?? `./docs/api${fileExtension}`;
  const absoluteOutputDir = resolve(dirname(outputPath));

  if(existsSync(absoluteOutputDir) === false){
    mkdirSync(absoluteOutputDir, { recursive: true });
  }

  writeFileSync(outputPath, renderedSymbols);

  return interpretedSymbols;

}
