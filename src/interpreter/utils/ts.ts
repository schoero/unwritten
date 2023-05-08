import { isAliasedSymbol } from "unwritten:interpreter:typeguards/symbols.js";
import * as locker from "unwritten:interpreter:utils/locker.js";
import { assert } from "unwritten:utils:general.js";

import type { Program, Symbol, Type } from "typescript";

import type { Types } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function getEntryFileSymbolFromProgram(ctx: InterpreterContext, program: Program) {

  const rootFileName = program.getRootFileNames()[0];

  assert(rootFileName, "Root file not found.");

  const entryFile = program.getSourceFile(rootFileName);

  assert(entryFile, `Entry file not found. ${rootFileName}`);

  const entryFileSymbol = ctx.checker.getSymbolAtLocation(entryFile);

  assert(entryFileSymbol, "Entry file symbol not found.");

  return entryFileSymbol;

}


export function getExportedSymbols(ctx: InterpreterContext, moduleSymbol: Symbol, exclude?: string[]) {
  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, moduleSymbol);
  const exportedSymbols = ctx.checker.getExportsOfModule(resolvedSymbol);
  return exportedSymbols;
}


//-- Locker

export function isTypeLocked(ctx: InterpreterContext, type: Type) {
  return locker.isTypeLocked(ctx, type);
}


//-- Symbol helpers
/**
 * Resolves symbols from imports to their actual symbols.
 * @param ctx - Interpreter context
 * @param symbol - Symbol to resolve
 * @returns Resolved symbol
 */
export function resolveSymbolInCaseOfImport(ctx: InterpreterContext, symbol: Symbol): Symbol {
  if(isAliasedSymbol(symbol)){
    return ctx.checker.getAliasedSymbol(symbol);
  }
  return symbol;
}


export function withLockedType<T extends Types>(ctx: InterpreterContext, type: Type, callback: (ctx: InterpreterContext, type: Type) => T): T {
  locker.lockType(ctx, type);
  const returnType = callback(ctx, type);
  locker.unlockType(ctx, type);
  return returnType;
}
