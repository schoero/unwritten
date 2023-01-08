import { createTypeArgumentEntity } from "quickdoks:compiler:entities";
import { createExpressionReference } from "quickdoks:compiler:ast/references/index.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByTypeNode } from "quickdoks:compiler:mixins/id.js";
import { getNameByTypeNode } from "quickdoks:compiler:mixins/name.js";
import { isTypeReferenceNode } from "quickdoks:compiler:typeguards/type-nodes.js";

import type { TypeReferenceNode, TypeReferenceType } from "typescript";

import type { ExpressionEntity, TypeReferenceEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createTypeReferenceEntity(ctx: CompilerContext, type: TypeReferenceType): ExpressionEntity | TypeReferenceEntity {
  return isTypeReferenceNode(type)
    ? createTypeReferenceByTypeNode(ctx, type)
    : createExpressionReference(ctx, type);
}

export function createTypeReferenceByTypeNode(ctx: CompilerContext, typeNode: TypeReferenceNode): TypeReferenceEntity {

  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);
  const typeArguments = typeNode.typeArguments?.map(typeArgument => createTypeArgumentEntity(ctx, typeArgument));
  const name = getNameByTypeNode(ctx, typeNode.typeName);
  const type = parseType(ctx, tsType);
  const id = getIdByTypeNode(ctx, typeNode);
  const kind = EntityKind.TypeReference;

  return {
    id,
    kind,
    name,
    type,
    typeArguments
  };

}
