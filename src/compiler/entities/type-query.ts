import { TypeQueryNode } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, TypeQuery } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { parseType } from "../entry-points/type.js";


export function createTypeQueryByTypeNode(ctx: CompilerContext, typeNode: TypeQueryNode): TypeQuery {

  const id = getIdByTypeNode(ctx, typeNode);
  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);
  const type = parseType(ctx, tsType);
  const name = typeNode.exprName.getText();
  const kind = Kind.TypeQuery;

  return {
    id,
    kind,
    name,
    type
  };

}
