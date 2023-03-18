import type { TypeChecker } from "typescript";

import type { CompleteConfig } from "unwritten:type-definitions/config.js";
import type { DefaultContext, InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createContext(defaultContext: DefaultContext, checker: TypeChecker, config: CompleteConfig): InterpreterContext {
  return {
    checker,
    config,
    ...defaultContext
  };
}
