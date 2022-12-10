import { TypeChecker } from "typescript";

import { Locker } from "quickdoks:compiler:locker/index.js";
import { CompleteConfig } from "quickdoks:types/config.js";
import { CompilerContext, DefaultContext } from "quickdoks:types/context.js";


export function createContext(defaultContext: DefaultContext, checker: TypeChecker, config: CompleteConfig): CompilerContext {

  const locker = new Locker();

  return {
    checker,
    config,
    locker,
    ...defaultContext
  };

}
