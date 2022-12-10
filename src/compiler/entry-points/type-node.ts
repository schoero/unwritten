import { TypeNode } from "typescript";

import { createTemplateLiteralTypeByTypeNode } from "quickdoks:compiler/entities/template-literal-type.js";
import { createArrayByArrayTypeNode } from "quickdoks:compiler:entities/array.js";
import { createExpressionByExpressionWithTypeArguments } from "quickdoks:compiler:entities/expression.js";
import { createTupleByTupleTypeNode } from "quickdoks:compiler:entities/tuple-type.js";
import { createTypeQueryByTypeNode } from "quickdoks:compiler:entities/type-query.js";
import { createTypeReferenceByTypeNode } from "quickdoks:compiler:entities/type-reference.js";
import {
  isArrayTypeNode,
  isArrayTypeReferenceTypeNode,
  isExpressionWithTypeArguments,
  isTemplateLiteralTypeNode,
  isTupleTypeNode,
  isTypeQueryNode,
  isTypeReferenceNode
} from "quickdoks:compiler:typeguards/type-nodes.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Types } from "quickdoks:types:types.js";

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
  } else if(isTemplateLiteralTypeNode(typeNode)){
    return createTemplateLiteralTypeByTypeNode(ctx, typeNode);
  }

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return parseType(ctx, type);

}
