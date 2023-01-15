import { parseTypeNode } from "quickdoks:compiler/entry-points/type-node.js";
import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { getIdByTypeNode } from "quickdoks:compiler:mixins/id.js";
import { getNameByTypeNode } from "quickdoks:compiler:mixins/name.js";
import { isTypeReferenceNode } from "quickdoks:compiler:typeguards/type-nodes.js";
import { createExpressionType } from "quickdoks:compiler:types";

import type { TypeReferenceNode, TypeReferenceType as TSTypeReferenceType } from "typescript";

import type { ExpressionType, TypeReferenceType } from "quickdoks:compiler/type-definitions/types.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createTypeReferenceType(ctx: CompilerContext, type: TSTypeReferenceType): ExpressionType | TypeReferenceType {
  return isTypeReferenceNode(type)
    ? createTypeReferenceByTypeNode(ctx, type)
    : createExpressionType(ctx, type);
}

export function createTypeReferenceByTypeNode(ctx: CompilerContext, typeNode: TypeReferenceNode): TypeReferenceType {

  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);
  const typeArguments = typeNode.typeArguments?.map(typeNode => parseTypeNode(ctx, typeNode));
  const name = getNameByTypeNode(ctx, typeNode.typeName);
  const type = parseType(ctx, tsType);
  const id = getIdByTypeNode(ctx, typeNode);
  const kind = TypeKind.TypeReference;

  return {
    id,
    kind,
    name,
    type,
    typeArguments
  };

}
