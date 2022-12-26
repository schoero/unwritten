import { Map as TSMap, Program, Symbol, Type } from "typescript";

import { isAliasedSymbol } from "quickdoks:compiler:typeguards/symbols.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Types } from "quickdoks:type-definitions/types.d.js";


export function normalizeTSMap<T>(tsMap: Map<string, T> | TSMap<T>): Map<string, T> {
  if(tsMap instanceof Map){
    return tsMap;
  }
  const map = new Map();
  tsMap.forEach((value, key) => map.set(key, value));
  return map;
}


//-- Locker

export function isTypeLocked(ctx: CompilerContext, type: Type) {
  return ctx.locker.isTypeLocked(ctx, type);
}

export function lockType<T extends Types>(ctx: CompilerContext, type: Type, callback: (ctx: CompilerContext, type: Type) => T): T {
  ctx.locker.lockType(ctx, type);
  const returnType = callback(ctx, type);
  ctx.locker.unlockType(ctx, type);
  return returnType;
}


//-- Symbol helpers

/**
 * Resolves symbols from imports to their actual symbols.
 */
export function resolveSymbolInCaseOfImport(ctx: CompilerContext, symbol: Symbol): Symbol {
  if(isAliasedSymbol(symbol)){
    return ctx.checker.getAliasedSymbol(symbol);
  }
  return symbol;
}

export function getExportedSymbols(ctx: CompilerContext, moduleSymbol: Symbol, exclude?: string[]) {
  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, moduleSymbol);
  const exportedSymbols = ctx.checker.getExportsOfModule(resolvedSymbol);
  return exportedSymbols;
}

export function getEntryFileSymbolFromProgram(ctx: CompilerContext, program: Program) {

  const rootFileName = program.getRootFileNames()[0];

  assert(rootFileName, "Root file not found.");

  const entryFile = program.getSourceFile(rootFileName);

  assert(entryFile, `Entry file not found. ${rootFileName}`);

  const entryFileSymbol = ctx.checker.getSymbolAtLocation(entryFile);

  assert(entryFileSymbol, "Entry file symbol not found.");

  return entryFileSymbol;

}
