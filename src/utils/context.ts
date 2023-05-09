import type { logger as Logger } from "unwritten:logger/index.js";
import type { DefaultContext } from "unwritten:type-definitions/context.d.js";


export function createContext(logger?: typeof Logger): DefaultContext {
  return {
    logger
  };
}
