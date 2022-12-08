import { Symbol, Type } from "typescript";

import { createFunctionLikeBySymbol, createFunctionLikeByType } from "quickdoks:compiler:shared/function-like.js";
import { lockSymbol } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Function, Kind } from "quickdoks:types:types.js";


export const createFunctionBySymbol = (ctx: CompilerContext, symbol: Symbol): Function => lockSymbol(ctx, symbol, () => {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Function;

  return {
    ...functionLike,
    kind
  };

});


export function createFunctionByType(ctx: CompilerContext, type: Type): Function {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Function;

  return {
    ...functionLike,
    kind
  };

}
