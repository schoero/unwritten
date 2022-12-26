import { Symbol, Type } from "typescript";

import { createFunctionLikeBySymbol, createFunctionLikeByType } from "quickdoks:compiler:shared/function-like.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, Method } from "quickdoks:type-definitions/types.d.js";


export function createMethodBySymbol(ctx: CompilerContext, symbol: Symbol): Method {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Method;

  return {
    ...functionLike,
    kind
  };

}


export function createMethodByType(ctx: CompilerContext, type: Type): Method {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Method;

  return {
    ...functionLike,
    kind
  };

}
