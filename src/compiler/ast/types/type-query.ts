import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByTypeNode } from "quickdoks:compiler:mixins/id.js";

import type { TypeQueryNode } from "typescript";

import type { TypeQueryType } from "quickdoks:compiler:type-definitions/types.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
