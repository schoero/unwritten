import { TypeQueryNode } from "typescript";

import { getIdByTypeNode } from "quickdoks:compiler:compositions/id.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, TypeQuery } from "quickdoks:types:types.js";


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
