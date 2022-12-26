import { TypeNode } from "typescript";

import {
  createArrayByArrayTypeNode,
  createExpressionByExpressionWithTypeArguments,
  createTemplateLiteralTypeByTypeNode,
  createTupleByTupleTypeNode,
  createTypeQueryByTypeNode,
  createTypeReferenceByTypeNode
} from "quickdoks:compiler:entities";
import {
  isArrayTypeNode,
  isArrayTypeReferenceTypeNode,
  isExpressionWithTypeArguments,
  isTemplateLiteralTypeNode,
  isTupleTypeNode,
  isTypeQueryNode,
  isTypeReferenceNode
} from "quickdoks:compiler:typeguards/type-nodes.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Types } from "quickdoks:type-definitions/types.d.js";

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
  } else if(isTypeQueryNode(typeNode)){
    return createTypeQueryByTypeNode(ctx, typeNode);
  } else if(isTemplateLiteralTypeNode(typeNode)){
    return createTemplateLiteralTypeByTypeNode(ctx, typeNode);
  }


  if(isTypeReferenceNode(typeNode)){
    return createTypeReferenceByTypeNode(ctx, typeNode);
  } else if(isExpressionWithTypeArguments(typeNode)){
    return createExpressionByExpressionWithTypeArguments(ctx, typeNode);
  }


  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return parseType(ctx, type);

}
