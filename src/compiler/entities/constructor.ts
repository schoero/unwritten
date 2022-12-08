import { Symbol, Type } from "typescript";

import { createFunctionLikeBySymbol, createFunctionLikeByType } from "quickdoks:compiler:shared/function-like.js";
import { lockSymbol } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Constructor, Kind } from "quickdoks:types:types.js";


export const createConstructorBySymbol = (ctx: CompilerContext, symbol: Symbol): Constructor => lockSymbol(ctx, symbol, () => {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Constructor;

  return {
    ...functionLike,
    kind
  };

});


export function createConstructorByType(ctx: CompilerContext, type: Type): Constructor {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Constructor;

  return {
    ...functionLike,
    kind
  };

}
