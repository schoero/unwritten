import { Symbol, Type } from "typescript";

import { createFunctionLikeBySymbol, createFunctionLikeByType } from "quickdoks:compiler:shared/function-like.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, Setter } from "quickdoks:type-definitions/types.d.js";


export function createSetterBySymbol(ctx: CompilerContext, symbol: Symbol): Setter {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Setter;

  return {
    ...functionLike,
    kind
  };

}


export function createSetterByType(ctx: CompilerContext, type: Type): Setter {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Setter;

  return {
    ...functionLike,
    kind
  };

}
