import ts from "typescript";

import { compile } from "unwritten:compiler:browser.js";
import { createConfig } from "unwritten:config/config.js";
import { interpret } from "unwritten:interpreter/ast/symbol.js";
import { createContext as createInterpreterContext } from "unwritten:interpreter:utils/context.js";
import { getEntryFileSymbolsFromProgram } from "unwritten:interpreter:utils/ts.js";
import fs from "unwritten:platform/file-system/browser.js";
import os from "unwritten:platform/os/browser.js";
import path from "unwritten:platform/path/browser.js";
import process from "unwritten:platform/process/browser.js";
import { getRenderer } from "unwritten:renderer:index.js";
import { createContext as createRenderContext } from "unwritten:renderer:utils/context.js";
import { createContext as createDefaultContext } from "unwritten:utils:context.js";

import type { BrowserAPIOptions } from "unwritten:type-definitions/options.js";
import type { RenderOutput } from "unwritten:type-definitions/renderer.js";


export async function unwritten(code: string, options?: BrowserAPIOptions): Promise<RenderOutput> {

  // Dependencies
  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:platform/logger/browser.js");
  const defaultContext = createDefaultContext({
    fs,
    logger,
    os,
    path,
    process,
    ts
  });


  // Compile
  const { checker, program } = compile(defaultContext, code, options?.tsconfig);


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
