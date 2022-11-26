import { Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { ensureSymbolHasId, getIdBySymbol } from "../compositions/id.js";


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
