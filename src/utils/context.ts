import { Logger } from "quickdoks:logger/index.js";
import { DefaultContext } from "quickdoks:types/context.js";


export function createContext(logger?: Logger): DefaultContext {
  return {
    logger
  };
}
