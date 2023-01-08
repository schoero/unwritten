import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByTypeNode } from "quickdoks:compiler:mixins/id.js";
import { getPositionByNode } from "quickdoks:compiler:mixins/position.js";

import type { TypeNode } from "typescript";

import type { TypeArgumentEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createTypeArgumentEntity(ctx: CompilerContext, typeNode: TypeNode): TypeArgumentEntity {

  const id = getIdByTypeNode(ctx, typeNode);
  const position = getPositionByNode(ctx, typeNode);
  const type = parseTypeNode(ctx, typeNode);
  const kind = EntityKind.TypeArgument;

  return {
    id,
    kind,
    position,
    type
  };

}
