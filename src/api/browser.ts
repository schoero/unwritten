import { compile } from "unwritten:compiler:browser.js";
import { createConfig } from "unwritten:config/config.js";
import { interpret } from "unwritten:interpreter:ast/index.js";
import { createContext as createInterpreterContext } from "unwritten:interpreter:utils/context.js";
import { getEntryFileSymbolFromProgram } from "unwritten:interpreter:utils/ts.js";
import { getRenderer } from "unwritten:renderer:index.js";
import { createContext as createRenderContext } from "unwritten:renderer:utils/context.js";
import { createContext as createDefaultContext } from "unwritten:utils:context.js";

import type { BrowserAPIOptions } from "unwritten:type-definitions/options.js";


export async function unwritten(code: string, options?: BrowserAPIOptions): Promise<string> {


  //-- Logger

  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:logger/browser.js");
  const defaultContext = createDefaultContext(logger);


  //-- Compile

  const { checker, program } = compile(defaultContext, code, options?.tsconfig);


  //-- Parse

  const config = await createConfig(defaultContext, options?.config);
  const interpreterContext = createInterpreterContext(defaultContext, checker, config);
  const entryFileSymbol = getEntryFileSymbolFromProgram(interpreterContext, program);
  const parsedSymbols = interpret(interpreterContext, entryFileSymbol);


  //-- Render

  const renderer = await getRenderer(options?.renderer);
  const renderContext = createRenderContext(defaultContext, renderer, config);
  const renderedSymbols = renderer.render(renderContext, parsedSymbols);

  return renderedSymbols;

}
