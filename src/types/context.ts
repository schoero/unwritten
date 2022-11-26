import ts from "typescript";

import { LockedSymbols } from "../compiler/locked-symbols/index.js";
import { CompleteConfig } from "./config.js";
import { Renderer } from "./renderer.js";


export interface CompilerContext {
  checker: ts.TypeChecker;
  config: CompleteConfig;
  lockedSymbols: LockedSymbols;
}

export interface RenderContext<CustomRenderer extends Renderer = Renderer> {
  config: CompleteConfig;
  renderer: CustomRenderer;
}
