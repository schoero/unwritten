import { parseType } from "unwritten:compiler:entry-points/type.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByTypeNode } from "unwritten:compiler:shared/id.js";

import type { TypeQueryNode } from "typescript";

import type { TypeQueryType } from "unwritten:compiler:type-definitions/types.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createTypeQueryType(ctx: CompilerContext, typeNode: TypeQueryNode): TypeQueryType {

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
