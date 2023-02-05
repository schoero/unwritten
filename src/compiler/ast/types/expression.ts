import { getIdByTypeNode } from "unwritten:compiler/ast/shared/id.js";
import { getNameByType } from "unwritten:compiler/ast/shared/name.js";
import { parseType, parseTypeNode } from "unwritten:compiler:ast/index.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";

import type { ExpressionWithTypeArguments } from "typescript";

import type { ExpressionType } from "unwritten:compiler:type-definitions/types.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createExpressionType(ctx: CompilerContext, expressionWithTypeArguments: ExpressionWithTypeArguments): ExpressionType {

  const id = getIdByTypeNode(ctx, expressionWithTypeArguments);
  const tsInstanceType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments);
  const tsStaticType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments.expression);
  const name = getNameByType(ctx, tsStaticType);
  const instanceType = parseType(ctx, tsInstanceType);
  const staticType = parseType(ctx, tsStaticType);
  const typeArguments = expressionWithTypeArguments.typeArguments?.map(typeNode => parseTypeNode(ctx, typeNode));
  const kind = TypeKind.Expression;

  return {
    id,
    instanceType,
    kind,
    name,
    staticType,
    typeArguments
  };

}
