import { getSymbolId } from "unwritten:interpreter/ast/shared/id.js";
import { isAliasedSymbol } from "unwritten:interpreter/typeguards/symbols.js";
import * as locker from "unwritten:interpreter:utils/locker.js";
import { assert } from "unwritten:utils:general.js";

import type { Program, Symbol, Type as TSType } from "typescript";

import type { Entity } from "unwritten:interpreter/type-definitions/entities.js";
import type { Type } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function getEntryFileSymbolFromProgram(ctx: InterpreterContext, program: Program) {

  const rootFileName = program.getRootFileNames()[0];

  assert(rootFileName, "Root file not found.");

  const entryFile = program.getSourceFile(rootFileName);

  assert(entryFile, `Entry file not found. ${rootFileName}`);

  const entryFileSymbol = ctx.checker.getSymbolAtLocation(entryFile);

  assert(entryFileSymbol, "Entry file symbol not found.");

  return entryFileSymbol;

}


export function getExportedSymbols(ctx: InterpreterContext, moduleSymbol: Symbol) {
  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, moduleSymbol);
  const exportedSymbols = ctx.checker.getExportsOfModule(resolvedSymbol);

  // Filter out default export if it was exported as a named export
  // TODO: add `default` or `named` modifiers to reveal if a symbol was exported as a default or named export
  const uniqueExportedSymbols = exportedSymbols.filter((symbol, index, symbols) => {
    const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);
    return exportedSymbols.findIndex(otherSymbol => {
      const resolvedOtherSymbol = resolveSymbolInCaseOfImport(ctx, otherSymbol);
      return getSymbolId(ctx, resolvedOtherSymbol) === getSymbolId(ctx, resolvedSymbol);
    }) === index;
  });

  return uniqueExportedSymbols;
}


//-- Locker

export function isTypeLocked(ctx: InterpreterContext, type: TSType) {
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

export function withLockedSymbolType<T extends Entity>(ctx: InterpreterContext, symbol: Symbol, callback: (ctx: InterpreterContext, symbol: Symbol) => T): T {
  const type = ctx.checker.getDeclaredTypeOfSymbol(symbol);
  locker.lockType(ctx, type);
  const returnType = callback(ctx, symbol);
  locker.unlockType(ctx, type);
  return returnType;
}

export function withLockedType<T extends Type>(ctx: InterpreterContext, type: TSType, callback: (ctx: InterpreterContext, type: TSType) => T): T {
  locker.lockType(ctx, type);
  const returnType = callback(ctx, type);
  locker.unlockType(ctx, type);
  return returnType;
}
