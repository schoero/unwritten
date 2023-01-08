import { createTypeArgumentEntity } from "quickdoks:compiler:entities";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByTypeNode } from "quickdoks:compiler:mixins/id.js";
import { getNameByTypeNode } from "quickdoks:compiler:mixins/name.js";

import type { ExpressionWithTypeArguments } from "typescript";

import type { ExpressionEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createExpressionReference(ctx: CompilerContext, expressionWithTypeArguments: ExpressionWithTypeArguments): ExpressionEntity {

  const kind = EntityKind.Expression;
  const id = getIdByTypeNode(ctx, expressionWithTypeArguments);
  const name = getNameByTypeNode(ctx, expressionWithTypeArguments);
  const tsType = ctx.checker.getTypeAtLocation(expressionWithTypeArguments);
  const type = parseType(ctx, tsType);
  const typeArguments = expressionWithTypeArguments.typeArguments?.map(typeNode => createTypeArgumentEntity(ctx, typeNode));

  return {
    id,
    kind,
    name,
    type,
    typeArguments
  };

}
