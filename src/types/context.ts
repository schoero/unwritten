import ts from "typescript";

import { Cache } from "../compiler/cache/index.js";
import { Complete, Config } from "./config.js";


export interface CompilerContext {
  cache: Cache;
  checker: ts.TypeChecker;
  config: Complete<Config>;
}


export interface RenderContext {
  config: Complete<Config>;
  renderer: string;
}