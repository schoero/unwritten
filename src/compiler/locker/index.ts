import { ensureTypeHasId, getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { Type } from "typescript";

import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
