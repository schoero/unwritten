import ts from "typescript";

import { Cache } from "../compiler/cache/index.js";
import { CompleteConfig } from "./config.js";
import { Renderer } from "./renderer.js";


export interface CompilerContext {
  cache: Cache;
  checker: ts.TypeChecker;
  config: CompleteConfig;
}

export interface RenderContext<CustomRenderer extends Renderer = Renderer> {
  config: CompleteConfig;
  renderer: CustomRenderer;
}