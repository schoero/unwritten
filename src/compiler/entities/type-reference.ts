import { TypeReferenceNode } from "typescript";

import { parseSymbol } from "../../parser/index.js";
import { CompilerContext } from "../../types/context.js";
import { TypeKind, TypeReference } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { createTypeArgumentByTypeNode } from "./type-argument.js";


export function createTypeReferenceByTypeNode(ctx: CompilerContext, typeNode: TypeReferenceNode): TypeReference {

  const typeArguments = typeNode.typeArguments?.map(typeArgument => createTypeArgumentByTypeNode(ctx, typeArgument));
  const targetSymbol = ctx.checker.getSymbolAtLocation(typeNode.typeName);
  const target = targetSymbol && parseSymbol(ctx, targetSymbol);
  const id = getIdByTypeNode(ctx, typeNode);
  const kind = TypeKind.TypeReference;

  return {
    id,
    kind,
    target,
    typeArguments
  };

}
