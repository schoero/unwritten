import { getSymbolId } from "unwritten:interpreter/ast/shared/id.js";
import { isAliasedSymbol } from "unwritten:interpreter/typeguards/symbols.js";
import * as locker from "unwritten:interpreter:utils/locker.js";
import { assert } from "unwritten:utils:general.js";

import type { Program, Symbol, Type as TSType } from "typescript";

import type { Entity } from "unwritten:interpreter/type-definitions/entities.js";
import type { Type } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function getEntryFileSymbolsFromProgram(ctx: InterpreterContext, program: Program) {

  const rootFileNames = program.getRootFileNames();
  const entryFiles = rootFileNames.map(rootFileName => program.getSourceFile(rootFileName));

  entryFiles.forEach((entryFile, index) => assert(entryFile, `Entry file ${rootFileNames[index]} not found.`));

  const entryFileSymbols = entryFiles.map(entryFile => ctx.checker.getSymbolAtLocation(entryFile!));

  entryFileSymbols.forEach((entryFileSymbol, index) => assert(entryFileSymbol, `Entry file symbol ${rootFileNames[index]} not found.`));

  return entryFileSymbols as Symbol[];

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

export function withLockedSymbol<T extends Entity>(ctx: InterpreterContext, symbol: Symbol, callback: (ctx: InterpreterContext, symbol: Symbol) => T): T {
  locker.lockSymbol(ctx, symbol);
  const returnType = callback(ctx, symbol);
  locker.unlockSymbol(ctx, symbol);
  return returnType;
}

export function withLockedType<T extends Type>(ctx: InterpreterContext, type: TSType, callback: (ctx: InterpreterContext, type: TSType) => T): T {
  locker.lockType(ctx, type);
  const returnType = callback(ctx, type);
  locker.unlockType(ctx, type);
  return returnType;
}
