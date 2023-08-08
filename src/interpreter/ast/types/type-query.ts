import { TypeKind } from "unwritten:interpreter/enums/type.js";
import {
  getResolvedTypeByTypeNode,
  getTypeByResolvedAndDeclaredType,
  getTypeByTypeNode
} from "unwritten:interpreter:ast/index.js";
import { getIdByTypeNode, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";

import type { TypeQueryNode } from "typescript";

import type { TypeQueryType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTypeQueryType(ctx: InterpreterContext, typeNode: TypeQueryNode): TypeQueryType {

  const typeId = getIdByTypeNode(ctx, typeNode);

  const target = ctx.checker.getSymbolAtLocation(typeNode.exprName);
  const targetId = target && getSymbolId(ctx, target);
  const resolvedType = getResolvedTypeByTypeNode(ctx, typeNode);
  const type = getTypeByResolvedAndDeclaredType(ctx, resolvedType);

  const typeArguments = typeNode.typeArguments?.map(typeArgument => getTypeByTypeNode(ctx, typeArgument));

  const name = typeNode.exprName.getText();
  const kind = TypeKind.TypeQuery;

  return {
    kind,
    name,
    symbolId: targetId,
    type,
    typeArguments,
    typeId
  };

}
