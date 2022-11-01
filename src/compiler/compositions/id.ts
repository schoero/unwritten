import { Declaration, Symbol, Type, TypeNode } from "typescript";

import { CompilerContext } from "../../types/context.js";


export function getIdBySymbol(ctx: CompilerContext, symbol: Symbol): number {
  ensureSymbolHasId(ctx, symbol);
  // @ts-expect-error - Internal API
  return symbol.id;
}

export function getIdByDeclaration(ctx: CompilerContext, declaration: Declaration): number {
  ensureDeclarationHasId(ctx, declaration);
  // @ts-expect-error - Internal API
  return declaration.id;
}

export function getIdByType(ctx: CompilerContext, type: Type): number {
  ensureTypeHasId(ctx, type);
  // @ts-expect-error - Internal API
  return type.id;
}

export function getIdByTypeNode(ctx: CompilerContext, typeNode: TypeNode): number {
  ensureTypeNodeHasId(ctx, typeNode);
  // @ts-expect-error - Internal API
  return typeNode.id;
}


export function ensureSymbolHasId(ctx: CompilerContext, symbol: Symbol) {

  // If a symbol has no id, we need to let it interact with the checker to get an id.

  if("id" in symbol === false){
    ctx.checker.symbolToString(symbol);
  }

}

export function ensureDeclarationHasId(ctx: CompilerContext, declaration: Declaration) {

  // If a declaration has no id, we need to let it interact with the checker to get an id.

  if("id" in declaration === false){
    ctx.checker.getSymbolAtLocation(declaration);
  }

}


export function ensureTypeHasId(ctx: CompilerContext, type: Type) {

  // If a type has no id, we need to let it interact with the checker to get an id.

  if("id" in type === false){
    ctx.checker.typeToString(type);
  }

}


export function ensureTypeNodeHasId(ctx: CompilerContext, typeNode: TypeNode) {

  // If a typeNode has no id, we need to let it interact with the checker to get an id.

  if("id" in typeNode === false){
    ctx.checker.getTypeFromTypeNode(typeNode);
  }

}
