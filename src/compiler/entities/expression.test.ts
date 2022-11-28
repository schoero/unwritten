import { ExpressionWithTypeArguments } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Expression, Kind } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { getNameByTypeNode } from "../compositions/name.js";
import { parseType } from "../entry-points/type.js";
import { createTypeArgumentByTypeNode } from "./type-argument.js";


export function createExpression(ctx: CompilerContext, expression: ExpressionWithTypeArguments): Expression {

  const id = getIdByTypeNode(ctx, expression);
  const name = getNameByTypeNode(ctx, expression);
  const typeArguments = expression.typeArguments?.map(typeNode => createTypeArgumentByTypeNode(ctx, typeNode));
  const tsType = ctx.checker.getTypeAtLocation(expression);
  const expressionType = ctx.checker.getTypeAtLocation(expression.expression);
  const type = parseType(ctx, tsType);
  const kind = Kind.Expression;

  return {
    id,
    kind,
    name,
    type,
    typeArguments
  };
}
