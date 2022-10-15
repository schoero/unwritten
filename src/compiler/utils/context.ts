import { TypeChecker } from "typescript";

import { Complete, Config } from "../../types/config.js";
import { CompilerContext } from "../../types/context.js";
import { Cache } from "../cache/index.js";


export function createContext(checker: TypeChecker, config: Complete<Config>): CompilerContext {
  return {
    cache: new Cache(),
    checker,
    config
  };
}