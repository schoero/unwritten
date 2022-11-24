import { NodeArray, Symbol, TypeNode } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Circular, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionBySymbol } from "../compositions/position.js";


export function createLinkToSymbol(ctx: CompilerContext, symbol: Symbol, typeArguments?: NodeArray<TypeNode>): Circular {

  const id = getIdBySymbol(ctx, symbol);
  const position = getPositionBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Circular;

  return {
    id,
    kind,
    name,
    position
  };

}
