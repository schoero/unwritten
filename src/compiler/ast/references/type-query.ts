import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByTypeNode } from "quickdoks:compiler:mixins/id.js";

import type { TypeQueryNode } from "typescript";

import type { TypeQueryEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createTypeQueryReference(ctx: CompilerContext, typeNode: TypeQueryNode): TypeQueryEntity {

  const id = getIdByTypeNode(ctx, typeNode);
  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);
  const type = parseType(ctx, tsType);
  const name = typeNode.exprName.getText();
  const kind = EntityKind.TypeQuery;

  return {
    id,
    kind,
    name,
    type
  };

}
