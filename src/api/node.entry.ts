import ts from "typescript";

import { compile } from "unwritten:compiler:node.js";
import { createConfig } from "unwritten:config/config.js";
import { interpret } from "unwritten:interpreter:ast/index.js";
import { createContext as createInterpreterContext } from "unwritten:interpreter:utils/context.js";
import { getEntryFileSymbolsFromProgram } from "unwritten:interpreter:utils/ts.js";
import fs, { existsSync, mkdirSync, writeFileSync } from "unwritten:platform/file-system/node.js";
import os from "unwritten:platform/os/node.js";
import path from "unwritten:platform/path/node.js";
import process from "unwritten:platform/process/node.js";
import { getRenderer } from "unwritten:renderer:index.js";
import { createContext as createRenderContext } from "unwritten:renderer:utils/context.js";
import { createContext as createDefaultContext } from "unwritten:utils:context.js";

import type { APIOptions } from "unwritten:type-definitions/options.js";


export async function unwritten(entryFilePaths: string[] | string, options?: APIOptions): Promise<string[]> {

  entryFilePaths = Array.isArray(entryFilePaths) ? entryFilePaths : [entryFilePaths];

  // Dependencies
  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:platform/logger/node.js");
  const defaultContext = createDefaultContext({
    fs,
    logger,
    os,
    path,
    process,
    ts
  });

  // Compile
  const { checker, program } = compile(defaultContext, entryFilePaths, options?.tsconfig);

  // Config
  const config = await createConfig(defaultContext, options?.config, options?.output);

  // Interpret
  const interpreterContext = createInterpreterContext(defaultContext, checker, config);
  const entryFileSymbols = getEntryFileSymbolsFromProgram(interpreterContext, program);
  const interpretedFiles = interpret(interpreterContext, entryFileSymbols);

  // Render
  const renderer = await getRenderer(options?.renderer);
  const renderContext = createRenderContext(defaultContext, renderer, config);
  const renderedFiles = renderer.render(renderContext, interpretedFiles);

  // Create output directory
  if(existsSync(config.outputDir) === false){
    mkdirSync(config.outputDir, { recursive: true });
  }

  // Write output to files
  const outputPaths = Object.entries(renderedFiles).map(([filePath, renderedContent]) => {
    writeFileSync(filePath, renderedContent);
    return filePath;
  });

  return outputPaths;

}
