import { Symbol, TupleTypeReference, TypeReference, TypeReferenceNode } from "typescript";
import { assert } from "vitest";

import { isType, isTypeNode } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Reference, TypeKind } from "../../types/types.js";
import { isPathExcluded } from "../../utils/general.js";
import { getIdBySymbol, getIdByType, getIdByTypeNode } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { createTypeBySymbol, createTypeByType, createTypeByTypeNode } from "./type.js";


export function createTypeReferenceByTypeNode(ctx: CompilerContext, typeNode: TypeReferenceNode): Reference {

  const typeArguments = typeNode.typeArguments?.map(typeArgument => createTypeByTypeNode(ctx, typeArgument));
  const targetSymbol = getTargetSymbolByTypeReference(ctx, typeNode);
  const target = targetSymbol && createTargetBySymbol(ctx, targetSymbol);
  const id = getIdByTypeNode(ctx, typeNode);
  const kind = TypeKind.Reference;

  return {
    id,
    ...target,
    kind,
    typeArguments
  };

}


export function createTypeReferenceByType(ctx: CompilerContext, typeReference: TypeReference): Reference {

  const typeArguments = typeReference.typeArguments?.map(typeArgument => createTypeByType(ctx, typeArgument));
  const targetSymbol = getTargetSymbolByTypeReference(ctx, typeReference);
  const target = targetSymbol && createTargetBySymbol(ctx, targetSymbol);
  const id = getIdByType(ctx, typeReference);
  const kind = TypeKind.Reference;

  return {
    id,
    ...target,
    kind,
    typeArguments
  };

}


export function createTargetBySymbol(ctx: CompilerContext, symbol: Symbol) {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration, "Target declaration is not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const resolvedType = _getResolvedTypeBySymbol(ctx, symbol);

  return {
    id,
    name,
    position,
    resolvedType
  };

}


export function getTargetSymbolByTypeReference(ctx: CompilerContext, typeNodeOrType: TupleTypeReference | TypeReference | TypeReferenceNode): Symbol | undefined {

  let targetSymbol: Symbol | undefined;

  if(isType(typeNodeOrType)){
    targetSymbol = typeNodeOrType.aliasSymbol ?? typeNodeOrType.target.symbol;
  } else if(isTypeNode(typeNodeOrType)){
    targetSymbol = ctx.checker.getSymbolAtLocation(typeNodeOrType.typeName);
  }

  return targetSymbol;

}


function _getResolvedTypeBySymbol(ctx: CompilerContext, targetSymbol: Symbol) {

  const { config, cache } = ctx;
  const declaration = targetSymbol.valueDeclaration ?? targetSymbol.getDeclarations()?.[0];

  if(declaration){
    const excludePaths = config.compilerConfig.exclude;
    const position = getPositionByDeclaration(ctx, declaration);
    if(isPathExcluded(position.file, excludePaths)){
      return;
    }
  }

  if(cache.isSymbolCached(ctx, targetSymbol)){
    return;
  } else {
    cache.cacheSymbol(ctx, targetSymbol);
  }

  return createTypeBySymbol(ctx, targetSymbol);

}
