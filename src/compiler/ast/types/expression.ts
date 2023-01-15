import { parseTypeNode } from "quickdoks:compiler/entry-points/type-node.js";
import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { getIdByTypeNode } from "quickdoks:compiler:mixins/id.js";
import { getNameByTypeNode } from "quickdoks:compiler:mixins/name.js";

import type { ExpressionWithTypeArguments } from "typescript";

import type { ExpressionType } from "quickdoks:compiler/type-definitions/types.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createExpressionType(ctx: CompilerContext, expressionWithTypeArguments: ExpressionWithTypeArguments): ExpressionType {

  const id = getIdByTypeNode(ctx, expressionWithTypeArguments);
  const name = getNameByTypeNode(ctx, expressionWithTypeArguments);
  const tsType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments);
  const type = parseType(ctx, tsType);
  const typeArguments = expressionWithTypeArguments.typeArguments?.map(typeNode => parseTypeNode(ctx, typeNode));
  const kind = TypeKind.Expression;

  return {
    id,
    kind,
    name,
    type,
    typeArguments
  };

}
