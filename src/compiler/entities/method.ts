import { Symbol, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, Method } from "../../types/types.js";
import { createFunctionLikeBySymbol, createFunctionLikeByType } from "../shared/function-like.js";
import { lockSymbol } from "../utils/ts.js";


export const createMethodBySymbol = (ctx: CompilerContext, symbol: Symbol): Method => lockSymbol(ctx, symbol, () => {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Method;

  return {
    ...functionLike,
    kind
  };

});


export function createMethodByType(ctx: CompilerContext, type: Type): Method {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Method;

  return {
    ...functionLike,
    kind
  };

}
