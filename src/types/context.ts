import ts from "typescript";

import { ExportedSymbols } from "../compiler/exported-symbols/index.js";
import { CompleteConfig } from "./config.js";
import { Renderer } from "./renderer.js";


export interface CompilerContext {
  checker: ts.TypeChecker;
  config: CompleteConfig;
  exportedSymbols?: ExportedSymbols;
}

export interface RenderContext<CustomRenderer extends Renderer = Renderer> {
  config: CompleteConfig;
  renderer: CustomRenderer;
}
