import { Symbol, TupleTypeReference, TypeReference, TypeReferenceNode } from "typescript";
import { assert } from "vitest";

import { getCompilerConfig } from "../../config/index.js";
import { isType, isTypeNode } from "../../typeguards/ts.js";
import { Reference, TypeKind } from "../../types/types.js";
import { isPathExcluded } from "../../utils/general.js";
import { cacheSymbol, isSymbolCached } from "../cache/index.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeBySymbol, getTypeByType, getTypeByTypeNode } from "../compositions/type.js";
import { getContext } from "../context/index.js";


export function createTypeReferenceByTypeNode(typeNode: TypeReferenceNode): Reference {

  const typeArguments = typeNode.typeArguments?.map(getTypeByTypeNode);
  const targetSymbol = getTargetSymbolByTypeReference(typeNode);
  const target = createTargetBySymbol(targetSymbol);
  const kind = TypeKind.Reference;

  return {
    ...target,
    kind,
    typeArguments
  };

}


export function createTypeReferenceByType(typeReference: TypeReference): Reference {

  const typeArguments = typeReference.typeArguments?.map(getTypeByType);
  const targetSymbol = getTargetSymbolByTypeReference(typeReference);
  const target = createTargetBySymbol(targetSymbol);
  const kind = TypeKind.Reference;

  return {
    ...target,
    kind,
    typeArguments
  };

}


export function createTargetBySymbol(symbol: Symbol) {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration, "Target declaration is not found");

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const resolvedType = getResolvedTypeBySymbol(symbol);
  const position = getPositionByDeclaration(declaration);

  return {
    id,
    name,
    position,
    resolvedType
  };

}


export function getResolvedTypeBySymbol(targetSymbol: Symbol) {

  const declaration = targetSymbol.valueDeclaration ?? targetSymbol.getDeclarations()?.[0];
  if(declaration){
    const excludePaths = getCompilerConfig().exclude;
    const position = getPositionByDeclaration(declaration);
    if(isPathExcluded(position.file, excludePaths)){
      return;
    }
  }

  if(isSymbolCached(targetSymbol)){
    return;
  } else {
    cacheSymbol(targetSymbol);
  }

  return getTypeBySymbol(targetSymbol);

}


export function getTargetSymbolByTypeReference(typeNodeOrType: TupleTypeReference | TypeReference | TypeReferenceNode): Symbol {

  let targetSymbol: Symbol | undefined;

  if(isType(typeNodeOrType)){
    targetSymbol = typeNodeOrType.aliasSymbol ?? typeNodeOrType.target.symbol;
  } else if(isTypeNode(typeNodeOrType)){
    const type = getContext().checker.getTypeFromTypeNode(typeNodeOrType);

    targetSymbol = type.symbol; // alias symbol referes back to the "original" symbol
  }

  assert(targetSymbol, "Could not resolve target symbol from type reference");

  return targetSymbol;

}