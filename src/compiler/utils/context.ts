import { TypeChecker } from "typescript";

import { CompleteConfig } from "../../types/config.js";
import { CompilerContext } from "../../types/context.js";
import { LockedSymbols } from "../locked-symbols/index.js";


export function createContext(checker: TypeChecker, config: CompleteConfig): CompilerContext {
  return {
    checker,
    config,
    lockedSymbols: new LockedSymbols()
  };
}
