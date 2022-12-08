import { Map as TSMap, Program, Symbol } from "typescript";

import { isAliasedSymbol } from "quickdoks:compiler:typeguards/symbols.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Types } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function normalizeTSMap<T>(tsMap: Map<string, T> | TSMap<T>): Map<string, T> {
  if(tsMap instanceof Map){
    return tsMap;
  }
  const map = new Map();
  tsMap.forEach((value, key) => map.set(key, value));
  return map;
}


//-- Locker

export function isSymbolLocked(ctx: CompilerContext, symbol: Symbol) {
  return ctx.locker.isSymbolLocked(ctx, symbol);
}

export function lockSymbol<T extends Types>(ctx: CompilerContext, symbol: Symbol, callback: (ctx: CompilerContext, symbol: Symbol) => T): T {
  ctx.locker.lockSymbol(ctx, symbol);
  const returnType = callback(ctx, symbol);
  ctx.locker.unlockSymbol(ctx, symbol);
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
