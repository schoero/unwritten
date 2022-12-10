import { ExpressionWithTypeArguments } from "typescript";

import { getIdByTypeNode } from "quickdoks:compiler:compositions/id.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Expression, Kind } from "quickdoks:types:types.js";

import { createTypeArgumentByTypeNode } from "./type-argument.js";


export function createExpressionByExpressionWithTypeArguments(ctx: CompilerContext, expressionWithTypeArguments: ExpressionWithTypeArguments): Expression {

  const kind = Kind.Expression;
  const id = getIdByTypeNode(ctx, expressionWithTypeArguments);
  const tsType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments);
  const tsTypeSymbol = tsType.getSymbol();
  const declType = ctx.checker.getTypeOfSymbolAtLocation(tsTypeSymbol!, expressionWithTypeArguments.expression);
  const type = parseType(ctx, declType);
  const typeArguments = expressionWithTypeArguments.typeArguments?.map(typeNode => createTypeArgumentByTypeNode(ctx, typeNode));

  return {
    id,
    kind,
    type,
    typeArguments
  };

}
