import ts from "typescript";

import { Locker } from "../compiler/locker/index.js";
import { CompleteConfig } from "./config.js";
import { Renderer } from "./renderer.js";


export interface CompilerContext {
  checker: ts.TypeChecker;
  config: CompleteConfig;
  locker: Locker;
}

export interface RenderContext<CustomRenderer extends Renderer = Renderer> {
  config: CompleteConfig;
  renderer: CustomRenderer;
}
