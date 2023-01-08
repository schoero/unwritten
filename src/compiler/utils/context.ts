import { Locker } from "quickdoks:compiler:locker/index.js";

import type { TypeChecker } from "typescript";

import type { CompleteConfig } from "quickdoks:compiler:type-definitions/config.d..js";
import type { CompilerContext, DefaultContext } from "quickdoks:type-definitions/context.d.js";


export function createContext(defaultContext: DefaultContext, checker: TypeChecker, config: CompleteConfig): CompilerContext {

  const locker = new Locker();

  return {
    checker,
    config,
    locker,
    ...defaultContext
  };

}
