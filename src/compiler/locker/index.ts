import { Type } from "typescript";

import { ensureTypeHasId, getIdByType } from "quickdoks:compiler:compositions/id.js";
import { CompilerContext } from "quickdoks:types:context.js";


export class Locker {

  private _map = new Set<number>();

  public isTypeLocked(ctx: CompilerContext, type: Type) {
    ensureTypeHasId(ctx, type);
    return this._map.has(getIdByType(ctx, type));
  }


  public lockType(ctx: CompilerContext, type: Type) {
    ensureTypeHasId(ctx, type);
    this._map.add(getIdByType(ctx, type));
  }


  public unlockType(ctx: CompilerContext, type: Type) {
    ensureTypeHasId(ctx, type);
    this._map.delete(getIdByType(ctx, type));
  }

}
