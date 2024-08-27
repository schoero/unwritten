import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id";
import { getNameByTypeNode } from "unwritten:interpreter:ast/shared/name";
import { TypeKind } from "unwritten:interpreter/enums/type";

import { getTypeByType, getTypeByTypeNode } from "../type";

import type { ExpressionWithTypeArguments } from "typescript";

import type { ExpressionType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createExpressionType(ctx: InterpreterContext, expressionWithTypeArguments: ExpressionWithTypeArguments): ExpressionType {

  const typeId = getIdByTypeNode(ctx, expressionWithTypeArguments);
  const tsInstanceType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments);
  const tsStaticType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments.expression);

  const name = getNameByTypeNode(ctx, expressionWithTypeArguments);
  const instanceType = getTypeByType(ctx, tsInstanceType);
  const staticType = getTypeByType(ctx, tsStaticType);
  const typeArguments = expressionWithTypeArguments.typeArguments?.map(
    typeNode => getTypeByTypeNode(ctx, typeNode)
  );
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
