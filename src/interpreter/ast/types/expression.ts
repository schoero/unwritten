import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeByType, getTypeByTypeNode } from "unwritten:interpreter:ast/index.js";
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
