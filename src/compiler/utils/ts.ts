import { Symbol } from "typescript";

import { isAliasedSymbol } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";


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
