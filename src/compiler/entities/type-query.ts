import { TypeQueryNode } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, TypeQuery } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { createTypeByType } from "./type.js";


export function createTypeQueryByTypeNode(ctx: CompilerContext, typeNode: TypeQueryNode): TypeQuery {

  const id = getIdByTypeNode(ctx, typeNode);
  const tp = ctx.checker.getTypeFromTypeNode(typeNode);
  const type = createTypeByType(ctx, tp);
  const name = typeNode.exprName.getText();
  const kind = Kind.TypeQuery;

  return {
    id,
    kind,
    name,
    type
  };

}
