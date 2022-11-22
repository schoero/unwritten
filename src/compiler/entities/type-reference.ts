import { TypeReferenceNode } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { TypeKind, TypeReference } from "../../types/types.js";
import { getIdByTypeNode } from "../compositions/id.js";
import { isSymbolExported } from "../utils/ts.js";
import { createLinkBySymbol } from "./link.js";
import { createTypeBySymbol } from "./type.js";
import { createTypeArgumentByTypeNode } from "./type-argument.js";


export function createTypeReferenceByTypeNode(ctx: CompilerContext, typeNode: TypeReferenceNode): TypeReference {

  const typeArguments = typeNode.typeArguments?.map(typeArgument => createTypeArgumentByTypeNode(ctx, typeArgument));
  const targetSymbol = ctx.checker.getSymbolAtLocation(typeNode.typeName);
  const isTargetSymbolExported = targetSymbol && isSymbolExported(ctx, targetSymbol);
  const target = targetSymbol && (isTargetSymbolExported ? createLinkBySymbol(ctx, targetSymbol) : createTypeBySymbol(ctx, targetSymbol));
  const id = getIdByTypeNode(ctx, typeNode);
  const kind = TypeKind.TypeReference;

  return {
    id,
    kind,
    target,
    typeArguments
  };

}
