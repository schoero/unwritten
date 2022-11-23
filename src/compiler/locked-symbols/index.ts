import { Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { ensureSymbolHasId, getIdBySymbol } from "../compositions/id.js";


export class LockedSymbols {

  private _map = new Set<number>();

  public isSymbolLocked(ctx: CompilerContext, symbol: Symbol) {
    ensureSymbolHasId(ctx, symbol);
    return this._map.has(getIdBySymbol(ctx, symbol));
  }


  public lockedSymbol<T extends Types>(ctx: CompilerContext, symbol: Symbol, callback: (ctx: CompilerContext, symbol: Symbol) => T) {
    this.lockSymbol(ctx, symbol);
    const returnType = callback(ctx, symbol);
    this.unlockSymbol(ctx, symbol);
    return returnType;
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
