import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { resolveSymbolInCaseOfImport } from "unwritten:interpreter/utils/ts.js";
import { interpretSymbol } from "unwritten:interpreter/ast/symbol.js";
import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id.js";

import {
  getResolvedTypeByTypeNode,
  getTypeByResolvedAndDeclaredType,
  getTypeByTypeNode
} from "../type";

import type { TypeQueryNode } from "typescript";

import type { TypeQueryType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTypeQueryType(ctx: InterpreterContext, typeNode: TypeQueryNode): TypeQueryType {

  const typeId = getIdByTypeNode(ctx, typeNode);

  const symbol = ctx.checker.getSymbolAtLocation(typeNode.exprName);
  const resolvedSymbol = symbol && resolveSymbolInCaseOfImport(ctx, symbol);
  const target = resolvedSymbol && interpretSymbol(ctx, resolvedSymbol);

  const resolvedType = getResolvedTypeByTypeNode(ctx, typeNode);
  const type = getTypeByResolvedAndDeclaredType(ctx, resolvedType);

  const typeArguments = typeNode.typeArguments?.map(typeArgument => getTypeByTypeNode(ctx, typeArgument));

  const name = typeNode.exprName.getText();
  const kind = TypeKind.TypeQuery;

  return {
    kind,
    name,
    target,
    type,
    typeArguments,
    typeId
  };

}
