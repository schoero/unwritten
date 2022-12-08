import { TypeChecker } from "typescript";

import { Locker } from "quickdoks:compiler:locker/index.js";
import { CompleteConfig } from "quickdoks:types/config.js";
import { CompilerContext } from "quickdoks:types/context.js";


export function createContext(checker: TypeChecker, config: CompleteConfig): CompilerContext {
  return {
    checker,
    config,
    locker: new Locker()
  };
}
