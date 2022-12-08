import { TypeReferenceNode, TypeReferenceType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Expression, Kind, TypeReference } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { getNameByTypeNode } from "../compositions/name.js";
import { parseType } from "../entry-points/type.js";
import { isTypeReferenceNode } from "../typeguards/type-nodes.js";
import { createExpressionByExpressionWithTypeArguments } from "./expression.js";
import { createTypeArgumentByTypeNode } from "./type-argument.js";


export function createTypeReferenceByType(ctx: CompilerContext, type: TypeReferenceType): Expression | TypeReference {
  return isTypeReferenceNode(type)
    ? createTypeReferenceByTypeNode(ctx, type)
    : createExpressionByExpressionWithTypeArguments(ctx, type);
}

export function createTypeReferenceByTypeNode(ctx: CompilerContext, typeNode: TypeReferenceNode): TypeReference {

  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);
  const typeArguments = typeNode.typeArguments?.map(typeArgument => createTypeArgumentByTypeNode(ctx, typeArgument));
  const name = getNameByTypeNode(ctx, typeNode.typeName);
  const type = parseType(ctx, tsType);
  const id = getIdByTypeNode(ctx, typeNode);
  const kind = Kind.TypeReference;

  return {
    id,
    kind,
    name,
    type,
    typeArguments
  };

}
