import { ExpressionWithTypeArguments } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Expression, Kind } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { parseType } from "../entry-points/type.js";
import { createTypeArgumentByTypeNode } from "./type-argument.js";


export function createExpressionByExpressionWithTypeArguments(ctx: CompilerContext, expressionWithTypeArguments: ExpressionWithTypeArguments): Expression {

  const kind = Kind.Expression;
  const id = getIdByTypeNode(ctx, expressionWithTypeArguments);
  const tsType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments);
  const type = parseType(ctx, tsType);
  const typeArguments = expressionWithTypeArguments.typeArguments?.map(typeNode => createTypeArgumentByTypeNode(ctx, typeNode));

  return {
    id,
    kind,
    type,
    typeArguments
  };

}
