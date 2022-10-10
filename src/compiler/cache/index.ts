
import ts from "typescript";

import { CompilerContext } from "../../types/context.js";
import { ensureSymbolHasId, getIdBySymbol } from "../compositions/id.js";
import { resolveSymbolInCaseOfImport } from "../utils/ts.js";


type SymbolCache = number[];

export class Cache {

  private _symbolCache: SymbolCache = [];

  public cacheSymbol(ctx: CompilerContext, symbol: ts.Symbol) {

    ensureSymbolHasId(ctx, symbol);

    this._symbolCache.push(getIdBySymbol(ctx, symbol));

    const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

    ensureSymbolHasId(ctx, resolvedSymbol);

    if(getIdBySymbol(ctx, resolvedSymbol) !== getIdBySymbol(ctx, symbol)){
      this._symbolCache.push(getIdBySymbol(ctx, resolvedSymbol));
    }

    return symbol;

  }


  public removeCachedSymbol(ctx: CompilerContext, symbol: ts.Symbol) {

    ensureSymbolHasId(ctx, symbol);

    const index = this._symbolCache.indexOf(getIdBySymbol(ctx, symbol));

    if(index !== -1){
      this._symbolCache.splice(index, 1);
    }

  }


  public isSymbolCached(ctx: CompilerContext, symbol: ts.Symbol): boolean {
    ensureSymbolHasId(ctx, symbol);
    return this._symbolCache.includes(getIdBySymbol(ctx, symbol));
  }

}

