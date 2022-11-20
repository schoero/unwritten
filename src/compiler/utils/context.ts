import { TypeChecker } from "typescript";

import { CompleteConfig } from "../../types/config.js";
import { CompilerContext } from "../../types/context.js";


export function createContext(checker: TypeChecker, config: CompleteConfig): CompilerContext {
  return {
    checker,
    config
  };
}
