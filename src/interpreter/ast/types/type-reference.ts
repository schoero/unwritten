import { parseType, parseTypeNode } from "unwritten:interpreter:ast/index.js";
import { getIdByTypeNode, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByTypeNode } from "unwritten:interpreter:ast/shared/name.js";
import { createExpressionType, createUnresolvedByTypeNode } from "unwritten:interpreter:ast/types/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isTypeReferenceNode } from "unwritten:interpreter:typeguards/type-nodes.js";
import { isSymbolExcluded } from "unwritten:utils/exclude.js";

import type { TypeReferenceNode, TypeReferenceType as TSTypeReferenceType } from "typescript";

import type { ExpressionType, TypeReferenceType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createTypeReferenceType(ctx: InterpreterContext, type: TSTypeReferenceType): ExpressionType | TypeReferenceType {
  return isTypeReferenceNode(type)
    ? createTypeReferenceByTypeNode(ctx, type)
    : createExpressionType(ctx, type);
}

export function createTypeReferenceByTypeNode(ctx: InterpreterContext, typeNode: TypeReferenceNode): TypeReferenceType {

  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);
  const typeArguments = typeNode.typeArguments?.map(typeNode => parseTypeNode(ctx, typeNode));
  const name = getNameByTypeNode(ctx, typeNode.typeName);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const type = tsType.symbol && isSymbolExcluded(ctx, tsType.symbol, name)
    ? createUnresolvedByTypeNode(ctx, typeNode)
    : parseType(ctx, tsType);

  const typeId = getIdByTypeNode(ctx, typeNode);
  const kind = TypeKind.TypeReference;
  const symbol = ctx.checker.getSymbolAtLocation(typeNode.typeName);
  const symbolId = symbol && getSymbolId(ctx, symbol);

  return {
    kind,
    name,
    symbolId,
    type,
    typeArguments,
    typeId
  };

}
