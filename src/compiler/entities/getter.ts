import { Symbol, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Getter, Kind } from "../../types/types.js";
import { createFunctionLikeBySymbol, createFunctionLikeByType } from "../shared/function-like.js";
import { lockSymbol } from "../utils/ts.js";


export const createGetterBySymbol = (ctx: CompilerContext, symbol: Symbol): Getter => lockSymbol(ctx, symbol, () => {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Getter;

  return {
    ...functionLike,
    kind
  };

});


export function createGetterByType(ctx: CompilerContext, type: Type): Getter {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Getter;

  return {
    ...functionLike,
    kind
  };

}
