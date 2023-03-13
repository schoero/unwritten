import { isAliasedSymbol } from "unwritten:compiler:typeguards/symbols.js";
import * as locker from "unwritten:compiler:utils/locker.js";
import { assert } from "unwritten:utils:general.js";

import type { Map as TSMap, Program, Symbol, Type } from "typescript";

import type { Types } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function getEntryFileSymbolFromProgram(ctx: CompilerContext, program: Program) {

  const rootFileName = program.getRootFileNames()[0];

  assert(rootFileName, "Root file not found.");

  const entryFile = program.getSourceFile(rootFileName);

  assert(entryFile, `Entry file not found. ${rootFileName}`);

  const entryFileSymbol = ctx.checker.getSymbolAtLocation(entryFile);

  assert(entryFileSymbol, "Entry file symbol not found.");

  return entryFileSymbol;

}


export function getExportedSymbols(ctx: CompilerContext, moduleSymbol: Symbol, exclude?: string[]) {
  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, moduleSymbol);
  const exportedSymbols = ctx.checker.getExportsOfModule(resolvedSymbol);
  return exportedSymbols;
}


//-- Locker

export function isTypeLocked(ctx: CompilerContext, type: Type) {
  return locker.isTypeLocked(ctx, type);
}


export function lockType<T extends Types>(ctx: CompilerContext, type: Type, callback: (ctx: CompilerContext, type: Type) => T): T {
  locker.lockType(ctx, type);
  const returnType = callback(ctx, type);
  locker.unlockType(ctx, type);
  return returnType;
}


export function normalizeTSMap<T>(tsMap: Map<string, T> | TSMap<T>): Map<string, T> {
  if(tsMap instanceof Map){
    return tsMap;
  }
  const map = new Map();
  tsMap.forEach((value, key) => map.set(key, value));
  return map;
}

//-- Symbol helpers

/**
 * Resolves symbols from imports to their actual symbols.
 *
 * @param ctx - Compiler context
 * @param symbol - Symbol to resolve
 * @returns Resolved symbol
 */
export function resolveSymbolInCaseOfImport(ctx: CompilerContext, symbol: Symbol): Symbol {
  if(isAliasedSymbol(symbol)){
    return ctx.checker.getAliasedSymbol(symbol);
  }
  return symbol;
}
