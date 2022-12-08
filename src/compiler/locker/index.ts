import { Symbol } from "typescript";

import { ensureSymbolHasId, getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { CompilerContext } from "quickdoks:types:context.js";


export class Locker {

  private _map = new Set<number>();

  public isSymbolLocked(ctx: CompilerContext, symbol: Symbol) {
    ensureSymbolHasId(ctx, symbol);
    return this._map.has(getIdBySymbol(ctx, symbol));
  }


  public lockSymbol(ctx: CompilerContext, symbol: Symbol) {
    ensureSymbolHasId(ctx, symbol);
    this._map.add(getIdBySymbol(ctx, symbol));
  }


  public unlockSymbol(ctx: CompilerContext, symbol: Symbol) {
    ensureSymbolHasId(ctx, symbol);
    this._map.delete(getIdBySymbol(ctx, symbol));
  }

}
