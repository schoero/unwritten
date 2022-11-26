import { Symbol, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Function, Kind } from "../../types/types.js";
import { createFunctionLikeBySymbol, createFunctionLikeByType } from "../shared/function-like.js";
import { lockSymbol } from "../utils/ts.js";


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
