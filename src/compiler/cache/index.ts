import ts from "typescript";

import { CompilerContext } from "../../types/context.js";
import { ensureSymbolHasId, getIdBySymbol } from "../compositions/id.js";
import { resolveSymbolInCaseOfImport } from "../utils/ts.js";


type SymbolCache = Set<number>;

export class Cache {

  private _symbolCache: SymbolCache = new Set();

  public cacheSymbol(ctx: CompilerContext, symbol: ts.Symbol) {

    ensureSymbolHasId(ctx, symbol);

    this._symbolCache.add(getIdBySymbol(ctx, symbol));

    const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

    ensureSymbolHasId(ctx, resolvedSymbol);

    if(getIdBySymbol(ctx, resolvedSymbol) !== getIdBySymbol(ctx, symbol)){
      this._symbolCache.add(getIdBySymbol(ctx, resolvedSymbol));
    }

    return symbol;

  }


  public removeCachedSymbol(ctx: CompilerContext, symbol: ts.Symbol) {
    ensureSymbolHasId(ctx, symbol);
    this._symbolCache.delete(getIdBySymbol(ctx, symbol));
  }


  public isSymbolCached(ctx: CompilerContext, symbol: ts.Symbol): boolean {
    ensureSymbolHasId(ctx, symbol);
    return this._symbolCache.has(getIdBySymbol(ctx, symbol));
  }

}
