import { Locker } from "unwritten:compiler:locker/index.js";

import type { TypeChecker } from "typescript";

import type { CompleteConfig } from "unwritten:compiler:type-definitions/config.d..js";
import type { CompilerContext, DefaultContext } from "unwritten:type-definitions/context.d.js";


export function createContext(defaultContext: DefaultContext, checker: TypeChecker, config: CompleteConfig): CompilerContext {

  const locker = new Locker();

  return {
    checker,
    config,
    locker,
    ...defaultContext
  };

}
