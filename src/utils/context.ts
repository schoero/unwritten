import type { DefaultContext } from "unwritten:type-definitions/context";


export function createContext(dependencies: DefaultContext["dependencies"]): DefaultContext {
  return {
    dependencies
  };
}
