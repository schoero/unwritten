import type { DefaultContext } from "unwritten:type-definitions/context.js";


export function createContext(dependencies: DefaultContext["dependencies"]): DefaultContext {
  return {
    dependencies
  };
}
