import ts from "typescript";

import { Cache } from "../compiler/cache/index.js";
import { Complete, Config } from "./config.js";
import { Renderer } from "./renderer.js";


export interface CompilerContext {
  cache: Cache;
  checker: ts.TypeChecker;
  config: Complete<Config>;
}

export interface RenderContext<CustomRenderer extends Renderer = Renderer> {
  config: Complete<Config>;
  renderer: CustomRenderer;
}