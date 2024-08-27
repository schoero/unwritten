import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id";
import { getNameByTypeNode } from "unwritten:interpreter:ast/shared/name";
import { createExpressionType } from "unwritten:interpreter:ast/types/index";
import { isTypeReferenceNode } from "unwritten:interpreter:typeguards/type-nodes";
import { interpretSymbol } from "unwritten:interpreter/ast/symbol";
import { TypeKind } from "unwritten:interpreter/enums/type";

import { getResolvedTypeByTypeNode, getTypeByTypeNode } from "../type";

import type { TypeReferenceType as TSTypeReferenceType, TypeReferenceNode } from "typescript";

import type { ExpressionType, TypeReferenceType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createTypeReferenceType(ctx: InterpreterContext, type: TSTypeReferenceType): ExpressionType | TypeReferenceType {
  return isTypeReferenceNode(ctx, type)
    ? createTypeReferenceByTypeNode(ctx, type)
    : createExpressionType(ctx, type);
}

export function createTypeReferenceByTypeNode(ctx: InterpreterContext, typeNode: TypeReferenceNode): TypeReferenceType {

  const name = getNameByTypeNode(ctx, typeNode.typeName);
  const symbol = ctx.checker.getSymbolAtLocation(typeNode.typeName);
  const target = symbol && interpretSymbol(ctx, symbol);

  const type = getResolvedTypeByTypeNode(ctx, typeNode);
  const typeId = getIdByTypeNode(ctx, typeNode);
  const kind = TypeKind.TypeReference;

  const typeArguments = typeNode.typeArguments?.map(
    typeArgumentTypeNode => getTypeByTypeNode(ctx, typeArgumentTypeNode)
  );

  return {
    kind,
    name,
    target,
    type,
    typeArguments,
    typeId
  };

}
