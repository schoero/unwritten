import type { TypeChecker } from "typescript";

import type { CompleteConfig } from "unwritten:type-definitions/config.js";
import type { CompilerContext, DefaultContext } from "unwritten:type-definitions/context.d.js";


export function createContext(defaultContext: DefaultContext, checker: TypeChecker, config: CompleteConfig): CompilerContext {
  return {
    checker,
    config,
    ...defaultContext
  };
}
