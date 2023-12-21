import ts from "typescript";

import { compile } from "unwritten:compiler:node";
import { createConfig } from "unwritten:config/config";
import { interpret } from "unwritten:interpreter/ast/symbol";
import { createContext as createInterpreterContext } from "unwritten:interpreter:utils/context";
import { getEntryFileSymbolsFromProgram } from "unwritten:interpreter:utils/ts";
import fs, { existsSync, mkdirSync, writeFileSync } from "unwritten:platform/file-system/node";
import os from "unwritten:platform/os/node";
import path from "unwritten:platform/path/node";
import process from "unwritten:platform/process/node";
import { getRenderer } from "unwritten:renderer:index";
import { createContext as createRenderContext } from "unwritten:renderer:utils/context";
import { createContext as createDefaultContext } from "unwritten:utils:context";

import type { APIOptions } from "unwritten:type-definitions/options";


export async function unwritten(entryFilePaths: string[] | string, options?: APIOptions): Promise<string[]> {

  entryFilePaths = Array.isArray(entryFilePaths) ? entryFilePaths : [entryFilePaths];

  // logger
  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:platform/logger/node.js");

  if(options?.debug){
    process.env.DEBUG = "true";
  }

  const defaultContext = createDefaultContext({
    fs,
    logger,
    os,
    path,
    process,
    ts
  });

  // compile
  const { checker, program } = compile(defaultContext, entryFilePaths, options?.tsconfig);

  // config
  const config = await createConfig(defaultContext, options?.config, options?.output);

  // renderer
  const renderer = await getRenderer(defaultContext, options?.renderer);

  // interpret
  const interpreterContext = createInterpreterContext(defaultContext, checker, config);
  const entryFileSymbols = getEntryFileSymbolsFromProgram(interpreterContext, program);
  const interpretedFiles = interpret(interpreterContext, entryFileSymbols);

  // render
  const renderContext = createRenderContext(defaultContext, renderer, config);
  const renderedFiles = renderer.render(renderContext, interpretedFiles);

  // create output directory
  if(existsSync(config.outputDir) === false){
    mkdirSync(config.outputDir, { recursive: true });
  }

  // write output to files
  const outputPaths = Object.entries(renderedFiles).map(([filePath, renderedContent]) => {
    writeFileSync(filePath, renderedContent);
    return filePath;
  });

  return outputPaths;

}
