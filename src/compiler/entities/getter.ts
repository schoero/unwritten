import { Symbol, Type } from "typescript";

import { createFunctionLikeBySymbol, createFunctionLikeByType } from "quickdoks:compiler:shared/function-like.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Getter, Kind } from "quickdoks:type-definitions/types.d.js";


export function createGetterBySymbol(ctx: CompilerContext, symbol: Symbol): Getter {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Getter;

  return {
    ...functionLike,
    kind
  };

}


export function createGetterByType(ctx: CompilerContext, type: Type): Getter {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Getter;

  return {
    ...functionLike,
    kind
  };

}
