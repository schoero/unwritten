import ts from "typescript";

import { convertDiagnostics, reportCompilerDiagnostics } from "unwritten:compiler/shared";
import { createConfig } from "unwritten:config/config";
import { createContext as createInterpreterContext } from "unwritten:interpreter:utils/context";
import { getEntryFileSymbolsFromProgram } from "unwritten:interpreter:utils/ts";
import { interpret } from "unwritten:interpreter/ast/symbol";
import os from "unwritten:platform/os/browser";
import path from "unwritten:platform/path/browser";
import process from "unwritten:platform/process/browser";
import { getRenderer } from "unwritten:renderer:index";
import { createContext as createRenderContext } from "unwritten:renderer:utils/context";
import { createContext as createDefaultContext } from "unwritten:utils:context";

import type { Program } from "typescript";

import type { BrowserAPIOptions } from "unwritten:type-definitions/options";
import type { UnwrittenOutput } from "unwritten:type-definitions/unwritten";


export async function unwritten(program: Program, options?: BrowserAPIOptions): Promise<UnwrittenOutput> {

  // logger
  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:platform/logger/browser.js");

  if(options?.debug){
    process.env.DEBUG = "true";
  }

  const defaultContext = createDefaultContext({
    logger,
    os,
    path,
    process,
    ts
  } as const);

  // setup
  const config = await createConfig(defaultContext, options?.config);
  const renderer = await getRenderer(defaultContext, options?.renderer);

  // compile
  const checker = program.getTypeChecker();
  const diagnostics = program.getSemanticDiagnostics();
  const diagnosticMessages = convertDiagnostics(defaultContext, diagnostics);
  reportCompilerDiagnostics(defaultContext, diagnostics);

  // interpret
  const interpreterContext = createInterpreterContext(defaultContext, checker, config);
  const entryFileSymbol = getEntryFileSymbolsFromProgram(interpreterContext, program);
  const interpretedFiles = interpret(interpreterContext, entryFileSymbol);

  // render
  const renderContext = createRenderContext(defaultContext, renderer, config);
  const renderedSymbols = renderer.render(renderContext, interpretedFiles);

  return {
    compilerDiagnostics: diagnosticMessages,
    rendered: renderedSymbols
  };

}
