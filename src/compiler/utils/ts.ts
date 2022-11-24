import { Map as TSMap, Symbol } from "typescript";

import { isAliasedSymbol } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";


export function normalizeTSMap<T>(tsMap: Map<string, T> | TSMap<T>): Map<string, T> {
  if(tsMap instanceof Map){
    return tsMap;
  }
  const map = new Map();
  tsMap.forEach((value, key) => map.set(key, value));
  return map;
}


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
  const name = moduleSymbol.getName();
  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, moduleSymbol);
  const exportedSymbols = ctx.checker.getExportsOfModule(resolvedSymbol);
  return exportedSymbols;
}


export function isSymbolExported(ctx: CompilerContext, symbol: Symbol) {
  return ctx.exportedSymbols?.isSymbolExported(ctx, symbol) ?? false;
}


export function isSymbolLocked(ctx: CompilerContext, symbol: Symbol) {
  return ctx.lockedSymbols.isSymbolLocked(ctx, symbol);
}

export function lockSymbol(ctx: CompilerContext, symbol: Symbol) {
  ctx.lockedSymbols.lockSymbol(ctx, symbol);
}

export function lockedSymbol<T extends Types>(ctx: CompilerContext, symbol: Symbol, callback: (ctx: CompilerContext, symbol: Symbol) => T): T {
  return ctx.lockedSymbols.lockedSymbol(ctx, symbol, callback);
}
