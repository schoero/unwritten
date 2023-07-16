import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getResolvedTypeByTypeNode } from "unwritten:interpreter:ast/index.js";
import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id.js";

import type { TypeQueryNode } from "typescript";

import type { TypeQueryType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTypeQueryType(ctx: InterpreterContext, typeNode: TypeQueryNode): TypeQueryType {

  const typeId = getIdByTypeNode(ctx, typeNode);
  const type = getResolvedTypeByTypeNode(ctx, typeNode);
  const name = typeNode.exprName.getText();
  const kind = TypeKind.TypeQuery;

  return {
    kind,
    name,
    type,
    typeId
  };

}
