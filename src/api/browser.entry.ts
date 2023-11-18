import ts from "typescript";

import { reportCompilerDiagnostics } from "unwritten:compiler/shared";
import { createConfig } from "unwritten:config/config";
import { interpret } from "unwritten:interpreter/ast/symbol";
import { createContext as createInterpreterContext } from "unwritten:interpreter:utils/context";
import { getEntryFileSymbolsFromProgram } from "unwritten:interpreter:utils/ts";
import os from "unwritten:platform/os/browser";
import path from "unwritten:platform/path/browser";
import process from "unwritten:platform/process/browser";
import { getRenderer } from "unwritten:renderer:index";
import { createContext as createRenderContext } from "unwritten:renderer:utils/context";
import { createContext as createDefaultContext } from "unwritten:utils:context";

import type { Program } from "typescript";

import type { BrowserAPIOptions } from "unwritten:type-definitions/options";
import type { RenderOutput } from "unwritten:type-definitions/renderer";


export async function unwritten(program: Program, options?: BrowserAPIOptions): Promise<RenderOutput> {

  // Dependencies
  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:platform/logger/browser.js");
  const defaultContext = createDefaultContext({
    logger,
    os,
    path,
    process,
    ts
  } as const);

  // Compile
  const checker = program.getTypeChecker();
  const diagnostics = program.getSemanticDiagnostics();
  void reportCompilerDiagnostics(defaultContext, diagnostics);

  // Parse
  const config = await createConfig(defaultContext, options?.config);
  const interpreterContext = createInterpreterContext(defaultContext, checker, config);
  const entryFileSymbol = getEntryFileSymbolsFromProgram(interpreterContext, program);
  const parsedSymbols = interpret(interpreterContext, entryFileSymbol);

  // Render
  const renderer = await getRenderer(options?.renderer);
  const renderContext = createRenderContext(defaultContext, renderer, config);
  const renderedSymbols = renderer.render(renderContext, parsedSymbols);

  return renderedSymbols;

}
