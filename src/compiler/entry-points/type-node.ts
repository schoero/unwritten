import {
  createExpressionReference,
  createTemplateLiteralEntity,
  createTypeQueryReference,
  createTypeReferenceEntity
} from "quickdoks:compiler:ast/references/index.js";
import { createArrayTypeByArrayTypeNode, createTupleByTupleTypeNode } from "quickdoks:compiler:ast/types/index.js";
import {
  isArrayTypeNode,
  isArrayTypeReferenceTypeNode,
  isExpressionWithTypeArguments,
  isTemplateLiteralTypeNode,
  isTupleTypeNode,
  isTypeQueryNode,
  isTypeReferenceNode
} from "quickdoks:compiler:typeguards/type-nodes.js";

import { parseType } from "./type.js";

import type { TypeNode } from "typescript";

import type { Types } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function parseTypeNode(ctx: CompilerContext, typeNode: TypeNode): Types {

  if(isArrayTypeNode(typeNode)){
    return createArrayTypeByArrayTypeNode(ctx, typeNode);
  } else if(isArrayTypeReferenceTypeNode(typeNode)){
    return createArrayTypeByArrayTypeNode(ctx, typeNode);
  } else if(isTupleTypeNode(typeNode)){
    return createTupleByTupleTypeNode(ctx, typeNode);
  } else if(isTypeQueryNode(typeNode)){
    return createTypeQueryReference(ctx, typeNode);
  } else if(isTemplateLiteralTypeNode(typeNode)){
    return createTemplateLiteralEntity(ctx, typeNode);
  }

  if(isTypeReferenceNode(typeNode)){
    return createTypeReferenceEntity(ctx, typeNode);
  } else if(isExpressionWithTypeArguments(typeNode)){
    return createExpressionReference(ctx, typeNode);
  }

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return parseType(ctx, type);

}
