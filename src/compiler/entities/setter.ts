import { Symbol, Type } from "typescript";

import { createFunctionLikeBySymbol, createFunctionLikeByType } from "quickdoks:compiler:shared/function-like.js";
import { lockSymbol } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Setter } from "quickdoks:types:types.js";


export const createSetterBySymbol = (ctx: CompilerContext, symbol: Symbol): Setter => lockSymbol(ctx, symbol, () => {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Setter;

  return {
    ...functionLike,
    kind
  };

});


export function createSetterByType(ctx: CompilerContext, type: Type): Setter {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Setter;

  return {
    ...functionLike,
    kind
  };

}
