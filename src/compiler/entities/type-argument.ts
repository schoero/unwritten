import { TypeNode } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, TypeArgument } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { getPositionByNode } from "../compositions/position.js";
import { parseTypeNode } from "../entry-points/type-node.js";


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
