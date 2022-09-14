import { Symbol, TypeReference, TypeReferenceNode } from "typescript";

import { assert } from "vitest";

import { isType, isTypeNode } from "../../typeguards/ts.js";
import { EntityKind, FromSymbol, Reference, Target } from "../../types/types.js";
import { cacheSymbol, isSymbolCached } from "../cache/index.js";
import { getIdBySymbol, getIdByType, getIdByTypeNode } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol, getNameByType, getNameByTypeNode } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeBySymbol } from "../compositions/type.js";
import { getContext } from "../context/index.js";


export function createTypeReferenceByTypeNode(typeNode: TypeReferenceNode): Reference {

  const name = getNameByTypeNode(typeNode);
  const id = getIdByTypeNode(typeNode);
  const targetSymbol = getTargetSymbolByTypeReference(typeNode);
  const target = createTargetBySymbol(targetSymbol);
  const kind = EntityKind.Reference;

  return {
    id,
    kind,
    name,
    target
  };

}


export function createTypeReferenceByType(type: TypeReference): Reference {

  const name = getNameByType(type);
  const id = getIdByType(type);
  const targetSymbol = getTargetSymbolByTypeReference(type);
  const target = createTargetBySymbol(targetSymbol);
  const kind = EntityKind.Reference;

  return {
    id,
    kind,
    name,
    target
  };

}

function createTargetBySymbol(symbol: Symbol): FromSymbol<Target> {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration, "Target declaration is not found");

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const resolvedType = resolveType(symbol);
  const position = getPositionByDeclaration(declaration);
  const description = getDescriptionByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const kind = EntityKind.Target;

  return {
    id,
    kind,
    name,
    position,
    description,
    example,
    resolvedType
  };

}


function resolveType(targetSymbol: Symbol) {

  if(isSymbolCached(targetSymbol)){
    return;
  } else {
    cacheSymbol(targetSymbol);
  }

  return getTypeBySymbol(targetSymbol);

}


function getTargetSymbolByTypeReference(typeNodeOrType: TypeReference | TypeReferenceNode): Symbol {

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