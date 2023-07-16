import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getDeclaredType, getResolvedTypeByType } from "unwritten:interpreter:ast/index.js";
import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByTypeNode } from "unwritten:interpreter:ast/shared/name.js";

import type { ExpressionWithTypeArguments } from "typescript";

import type { ExpressionType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createExpressionType(ctx: InterpreterContext, expressionWithTypeArguments: ExpressionWithTypeArguments): ExpressionType {

  const typeId = getIdByTypeNode(ctx, expressionWithTypeArguments);
  const tsInstanceType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments);
  const tsStaticType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments.expression);

  const name = getNameByTypeNode(ctx, expressionWithTypeArguments);
  const instanceType = getResolvedTypeByType(ctx, tsInstanceType);
  const staticType = getResolvedTypeByType(ctx, tsStaticType);
  const typeArguments = expressionWithTypeArguments.typeArguments?.map(
    typeNode => getDeclaredType(ctx, typeNode)
  ); // TODO: check if declared type is correct
  const kind = TypeKind.Expression;

  return {
    instanceType,
    kind,
    name,
    staticType,
    typeArguments,
    typeId
  };

}
