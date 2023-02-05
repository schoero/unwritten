import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { parse } from "unwritten:compiler/ast/index.js";
import { compile } from "unwritten:compiler:index.js";
import { createContext as createCompilerContext } from "unwritten:compiler:utils/context.js";
import { getEntryFileSymbolFromProgram } from "unwritten:compiler:utils/ts.js";
import { createConfig } from "unwritten:config/index.js";
import { Logger } from "unwritten:logger/index.js";
import { getRenderer } from "unwritten:renderer:index.js";
import { createContext as createRenderContext } from "unwritten:renderer:utils/context.js";
import { createContext as createDefaultContext } from "unwritten:utils:context.js";

import type { APIOptions } from "unwritten:type-definitions/options.d.js";


export async function unwritten(entryFilePath: string, options?: APIOptions) {

  const absoluteEntryFilePath = resolve(entryFilePath);


  //-- Logger

  const logger = options?.silent ? undefined : Logger;
  const defaultContext = createDefaultContext(logger);


  //-- Compile

  const { checker, program } = compile(defaultContext, absoluteEntryFilePath, options?.tsconfig);


  //-- Parse

  const config = await createConfig(defaultContext, options?.config);
  const compilerContext = createCompilerContext(defaultContext, checker, config);
  const entryFileSymbol = getEntryFileSymbolFromProgram(compilerContext, program);
  const parsedSymbols = parse(compilerContext, entryFileSymbol);


  //-- Render

  const renderer = await getRenderer(options?.renderer);
  const renderContext = createRenderContext(defaultContext, renderer, config);
  const renderedSymbols = renderer.render(renderContext, parsedSymbols);


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
