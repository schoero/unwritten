import { Symbol, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Constructor, Kind } from "../../types/types.js";
import { createFunctionLikeBySymbol, createFunctionLikeByType } from "../shared/function-like.js";
import { lockSymbol } from "../utils/ts.js";


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
