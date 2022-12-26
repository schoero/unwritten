import { Symbol, Type } from "typescript";

import { lockType } from "quickdoks:compiler/utils/ts.js";
import { createFunctionLikeBySymbol, createFunctionLikeByType } from "quickdoks:compiler:shared/function-like.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Function, Kind } from "quickdoks:types:types.js";


export const test = () => "Test successful";

export function createFunctionBySymbol(ctx: CompilerContext, symbol: Symbol): Function {

  const functionLike = createFunctionLikeBySymbol(ctx, symbol);
  const kind = Kind.Function;

  return {
    ...functionLike,
    kind
  };

}


export const createFunctionByType = (ctx: CompilerContext, type: Type): Function => lockType(ctx, type, () => {

  const functionLike = createFunctionLikeByType(ctx, type);
  const kind = Kind.Function;

  return {
    ...functionLike,
    kind
  };

});
