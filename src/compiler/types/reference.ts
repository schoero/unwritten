import { Symbol, TypeReference, TypeReferenceNode } from "typescript";

import { assert } from "vitest";

import { isType, isTypeNode } from "../../typeguards/ts.js";
import { EntityKind, Reference } from "../../types/types.js";
import { cacheSymbol, isSymbolCached } from "../cache/index.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeBySymbol } from "../compositions/type.js";
import { getContext } from "../context/index.js";


export function createTypeReferenceByTypeNode(typeNode: TypeReferenceNode): Reference {

  const targetSymbol = _getTargetSymbolByTypeReference(typeNode);
  const target = _createTargetBySymbol(targetSymbol);
  const kind = EntityKind.Reference;

  return {
    ...target,
    kind
  };

}


export function createTypeReferenceByType(type: TypeReference): Reference {

  const targetSymbol = _getTargetSymbolByTypeReference(type);
  const target = _createTargetBySymbol(targetSymbol);
  const kind = EntityKind.Reference;

  return {
    ...target,
    kind
  };

}


function _createTargetBySymbol(symbol: Symbol) {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration, "Target declaration is not found");

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const resolvedType = resolveSymbol(symbol);
  const position = getPositionByDeclaration(declaration);

  return {
    id,
    name,
    position,
    resolvedType
  };

}


export function resolveSymbol(targetSymbol: Symbol) {

  if(isSymbolCached(targetSymbol)){
    return;
  } else {
    cacheSymbol(targetSymbol);
  }

  return getTypeBySymbol(targetSymbol);

}


function _getTargetSymbolByTypeReference(typeNodeOrType: TypeReference | TypeReferenceNode): Symbol {

  let targetSymbol: Symbol | undefined;

  if(isType(typeNodeOrType)){
    targetSymbol = typeNodeOrType.target.symbol;
  } else if(isTypeNode(typeNodeOrType)){
    const type = getContext().checker.getTypeFromTypeNode(typeNodeOrType);

    targetSymbol = type.aliasSymbol ?? type.symbol;
  }

  assert(targetSymbol, "Could not resolve target symbol from type reference");

  return targetSymbol;

}