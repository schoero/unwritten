import { TypeNode } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { createArrayByArrayTypeNode } from "../entities/array.js";
import { createExpressionByExpressionWithTypeArguments } from "../entities/expression.js";
import { createTupleByTupleTypeNode } from "../entities/tuple-type.js";
import { createTypeQueryByTypeNode } from "../entities/type-query.js";
import { createTypeReferenceByTypeNode } from "../entities/type-reference.js";
import {
  isArrayTypeNode,
  isArrayTypeReferenceTypeNode,
  isExpressionWithTypeArguments,
  isTupleTypeNode,
  isTypeQueryNode,
  isTypeReferenceNode
} from "../typeguards/type-nodes.js";
import { parseType } from "./type.js";


/**
 * Type references must be handled by type node because the type would be the referenced type.
 */
export function parseTypeNode(ctx: CompilerContext, typeNode: TypeNode): Types {

  if(isArrayTypeNode(typeNode)){
    return createArrayByArrayTypeNode(ctx, typeNode);
  } else if(isArrayTypeReferenceTypeNode(typeNode)){
    return createArrayByArrayTypeNode(ctx, typeNode);
  } else if(isTupleTypeNode(typeNode)){
    return createTupleByTupleTypeNode(ctx, typeNode);
  } else if(isTypeReferenceNode(typeNode)){
    return createTypeReferenceByTypeNode(ctx, typeNode);
  } else if(isTypeQueryNode(typeNode)){
    return createTypeQueryByTypeNode(ctx, typeNode);
  } else if(isExpressionWithTypeArguments(typeNode)){
    return createExpressionByExpressionWithTypeArguments(ctx, typeNode);
  }

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return parseType(ctx, type);

}
