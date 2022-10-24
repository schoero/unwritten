import { TypeChecker } from "typescript";

import { CompleteConfig } from "../../types/config.js";
import { CompilerContext } from "../../types/context.js";
import { Cache } from "../cache/index.js";


export function createContext(checker: TypeChecker, config: CompleteConfig): CompilerContext {
  return {
    cache: new Cache(),
    checker,
    config
  };
}