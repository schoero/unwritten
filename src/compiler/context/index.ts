import ts from "typescript";
import { assert } from "vitest";

let _program: ts.Program | undefined;
let _checker: ts.TypeChecker | undefined;

export function createContext(program: ts.Program, checker: ts.TypeChecker) {
  _program = program;
  _checker = checker;
  return getContext();
}

export function getContext() {
  assert(_program && _checker, "Context not initialized");
  return {
    checker: _checker,
    program: _program
  };
}