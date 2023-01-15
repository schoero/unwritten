import {
  isArrayTypeNode,
  isExpressionWithTypeArguments,
  isTemplateLiteralTypeNode,
  isTupleTypeNode,
  isTypeQueryNode,
  isTypeReferenceNode
} from "quickdoks:compiler:typeguards/type-nodes.js";
import {
  createArrayTypeByArrayTypeNode,
  createExpressionType,
  createTemplateLiteralType,
  createTupleByTupleTypeNode,
  createTypeQueryType,
  createTypeReferenceType
} from "quickdoks:compiler:types";

import { parseType } from "./type.js";

import type { TypeNode } from "typescript";

import type { Types } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function parseTypeNode(ctx: CompilerContext, typeNode: TypeNode): Types {

  if(isArrayTypeNode(typeNode)){
    return createArrayTypeByArrayTypeNode(ctx, typeNode);
  } else if(isTupleTypeNode(typeNode)){
    return createTupleByTupleTypeNode(ctx, typeNode);
  } else if(isTypeQueryNode(typeNode)){
    return createTypeQueryType(ctx, typeNode);
  } else if(isTemplateLiteralTypeNode(typeNode)){
    return createTemplateLiteralType(ctx, typeNode);
  }

  if(isTypeReferenceNode(typeNode)){
    return createTypeReferenceType(ctx, typeNode);
  } else if(isExpressionWithTypeArguments(typeNode)){
    return createExpressionType(ctx, typeNode);
  }

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return parseType(ctx, type);

}
