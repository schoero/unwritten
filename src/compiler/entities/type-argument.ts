import { TypeNode } from "typescript";

import { getIdByTypeNode } from "quickdoks:compiler:compositions/id.js";
import { getPositionByNode } from "quickdoks:compiler:compositions/position.js";
import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, TypeArgument } from "quickdoks:types:types.js";


export function createTypeArgumentByTypeNode(ctx: CompilerContext, typeNode: TypeNode): TypeArgument {

  const id = getIdByTypeNode(ctx, typeNode);
  const position = getPositionByNode(ctx, typeNode);
  const type = parseTypeNode(ctx, typeNode);
  const kind = Kind.TypeArgument;

  return {
    id,
    kind,
    position,
    type
  };

}
