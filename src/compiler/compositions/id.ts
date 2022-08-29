import { Declaration, Symbol, Type, TypeNode } from "typescript";
import { getContext } from "../context/index.js";


export function getIdBySymbol(symbol: Symbol): number {
  //@ts-expect-error
  return symbol.id;
}

export function getIdByDeclaration(declaration: Declaration): number {
  //@ts-expect-error
  return declaration.id;
}

export function getIdByType(type: Type): number {
  //@ts-expect-error
  return type.id;
}

export function getIdByTypeNode(typeNode: TypeNode): number {
  //@ts-expect-error
  return typeNode.id;
}


export function ensureSymbolHasId(symbol: Symbol) {

  // If a declaration has no id, we need to let it interact with the checker to get an id.

  if("id" in symbol === false){
    getContext().checker.symbolToString(symbol);
  }

}

export function ensureDeclarationHasId(declaration: Declaration) {

  // If a declaration has no id, we need to let it interact with the checker to get an id.

  if("id" in declaration === false){
    getContext().checker.getSymbolAtLocation(declaration);
  }

}


export function ensureTypeHasId(type: Type) {

  // If a type has no id, we need to let it interact with the checker to get an id.

  if("id" in type === false){
    getContext().checker.typeToString(type);
  }

}


export function ensureTypeNodeHasId(typeNode: TypeNode) {

  // If a typeNode has no id, we need to let it interact with the checker to get an id.

  if("id" in typeNode === false){
    getContext().checker.getTypeFromTypeNode(typeNode);
  }

}