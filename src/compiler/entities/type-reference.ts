import { ExpressionWithTypeArguments, TypeReferenceNode } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, TypeReference } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { getNameByTypeNode } from "../compositions/name.js";
import { parseType } from "../entry-points/type.js";
import { createTypeArgumentByTypeNode } from "./type-argument.js";


export function createTypeReferenceByTypeNode(ctx: CompilerContext, typeNode: ExpressionWithTypeArguments | TypeReferenceNode): TypeReference {

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  const typeArguments = typeNode.typeArguments?.map(typeArgument => createTypeArgumentByTypeNode(ctx, typeArgument));
  const name = getNameByTypeNode(ctx, typeNode);
  const target = parseType(ctx, type);
  const id = getIdByTypeNode(ctx, typeNode);
  const kind = Kind.TypeReference;

  return {
    id,
    kind,
    name,
    type: target,
    typeArguments
  };

}
