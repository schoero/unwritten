import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { parse } from "quickdoks:compiler:entry-points/index.js";
import { compile } from "quickdoks:compiler:index.js";
import { createContext as createCompilerContext } from "quickdoks:compiler:utils/context.js";
import { getEntryFileSymbolFromProgram } from "quickdoks:compiler:utils/ts.js";
import { createConfig } from "quickdoks:config/index.js";
import { Logger } from "quickdoks:logger:index.js";
import { getRenderer } from "quickdoks:renderer:index.js";
import { createContext as createRenderContext } from "quickdoks:renderer:utils/context.js";
import { APIOptions } from "quickdoks:types:options.js";
import { createContext as createDefaultContext } from "quickdoks:utils:context.js";


export async function quickdoks(entryFilePath: string, options?: APIOptions) {

  const absoluteEntryFilePath = resolve(entryFilePath);


  //-- Logger

  const logger = options?.silent ? undefined : new Logger();
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
