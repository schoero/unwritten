import { getResolvedTypeByTypeNode, getTypeByTypeNode } from "unwritten:interpreter/ast/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { resolveSymbolInCaseOfImport } from "unwritten:interpreter/utils/ts.js";
import { getIdByTypeNode, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByTypeNode } from "unwritten:interpreter:ast/shared/name.js";
import { createExpressionType } from "unwritten:interpreter:ast/types/index.js";
import { isTypeReferenceNode } from "unwritten:interpreter:typeguards/type-nodes.js";

import type { TypeReferenceNode, TypeReferenceType as TSTypeReferenceType } from "typescript";

import type { ExpressionType, TypeReferenceType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTypeReferenceType(ctx: InterpreterContext, type: TSTypeReferenceType): ExpressionType | TypeReferenceType {
  return isTypeReferenceNode(ctx, type)
    ? createTypeReferenceByTypeNode(ctx, type)
    : createExpressionType(ctx, type);
}

export function createTypeReferenceByTypeNode(ctx: InterpreterContext, typeNode: TypeReferenceNode): TypeReferenceType {

  const symbol = ctx.checker.getSymbolAtLocation(typeNode.typeName);
  const resolvedSymbol = symbol && resolveSymbolInCaseOfImport(ctx, symbol);
  const symbolId = resolvedSymbol && getSymbolId(ctx, resolvedSymbol);
  const type = getResolvedTypeByTypeNode(ctx, typeNode);
  const typeId = getIdByTypeNode(ctx, typeNode);
  const name = getNameByTypeNode(ctx, typeNode.typeName);
  const kind = TypeKind.TypeReference;

  const typeArguments = typeNode.typeArguments?.map(
    typeArgumentTypeNode => getTypeByTypeNode(ctx, typeArgumentTypeNode)
  );

  return {
    kind,
    name,
    symbolId,
    type,
    typeArguments,
    typeId
  };

}
