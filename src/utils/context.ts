import type { DefaultBrowserContext, DefaultContext, DefaultNodeContext } from "unwritten:type-definitions/context";


export function createContext(dependencies: DefaultBrowserContext["dependencies"]): DefaultBrowserContext;
export function createContext(dependencies: DefaultNodeContext["dependencies"]): DefaultNodeContext;
export function createContext(dependencies: DefaultContext["dependencies"]): DefaultContext {
  return {
    dependencies
  };
}


export function isNodeContext(ctx: DefaultContext): ctx is DefaultNodeContext {
  return "fs" in ctx.dependencies;
}
