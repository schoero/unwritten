import { Symbol, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, Setter } from "../../types/types.js";
import { createFunctionLikeBySymbol, createFunctionLikeByType } from "../shared/function-like.js";
import { lockSymbol } from "../utils/ts.js";


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
