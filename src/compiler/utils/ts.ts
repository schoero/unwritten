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
