import { getIdBySymbol, getIdByTypeNode } from "unwritten:compiler/ast/shared/id.js";
import { getNameByTypeNode } from "unwritten:compiler/ast/shared/name.js";
import { parseType, parseTypeNode } from "unwritten:compiler:ast/index.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { isTypeReferenceNode } from "unwritten:compiler:typeguards/type-nodes.js";
import { createExpressionType } from "unwritten:compiler:types";

import type { TypeReferenceNode, TypeReferenceType as TSTypeReferenceType } from "typescript";

import type { ExpressionType, TypeReferenceType } from "unwritten:compiler:type-definitions/types.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
  const symbol = ctx.checker.getSymbolAtLocation(typeNode.typeName);
  const symbolId = symbol && getIdBySymbol(ctx, symbol);

  return {
    id,
    kind,
    name,
    symbolId,
    type,
    typeArguments
  };

}
