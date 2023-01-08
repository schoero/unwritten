import type { Logger } from "quickdoks:logger/index.js";
import type { DefaultContext } from "quickdoks:type-definitions/context.d.js";


export function createContext(logger?: Logger): DefaultContext {
  return {
    logger
  };
}
