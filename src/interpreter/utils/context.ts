import type { TypeChecker } from "typescript";

import type { CompleteConfig } from "unwritten:type-definitions/config";
import type {
  DefaultBrowserContext,
  DefaultContext,
  DefaultNodeContext,
  InterpreterBrowserContext,
  InterpreterContext,
  InterpreterNodeContext
} from "unwritten:type-definitions/context";


export function createContext(defaultContext: DefaultNodeContext, checker: TypeChecker, config: CompleteConfig): InterpreterNodeContext;
export function createContext(defaultContext: DefaultBrowserContext, checker: TypeChecker, config: CompleteConfig): InterpreterBrowserContext;
export function createContext(defaultContext: DefaultContext, checker: TypeChecker, config: CompleteConfig): InterpreterContext {
  return {
    checker,
    config,
    ...defaultContext
  };
}
