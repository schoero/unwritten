import { parseType } from "unwritten:interpreter:ast/index.js";
import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";

import type { TypeQueryNode } from "typescript";

import type { TypeQueryType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createTypeQueryType(ctx: InterpreterContext, typeNode: TypeQueryNode): TypeQueryType {

  const id = getIdByTypeNode(ctx, typeNode);
  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);
  const type = parseType(ctx, tsType);
  const name = typeNode.exprName.getText();
  const kind = TypeKind.TypeQuery;

  return {
    id,
    kind,
    name,
    type
  };

}
