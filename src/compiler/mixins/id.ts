import type { Declaration, Symbol, Type, TypeNode } from "typescript";

import type { ID } from "quickdoks:compiler:type-definitions/mixins.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function getIdBySymbol(ctx: CompilerContext, symbol: Symbol): ID {
  ensureSymbolHasId(ctx, symbol);
  // @ts-expect-error - Internal API
  return symbol.id;
}

export function getIdByDeclaration(ctx: CompilerContext, declaration: Declaration): ID {
  ensureDeclarationHasId(ctx, declaration);
  // @ts-expect-error - Internal API
  return declaration.id;
}

export function getIdByType(ctx: CompilerContext, type: Type): ID {
  ensureTypeHasId(ctx, type);
  // @ts-expect-error - Internal API
  return type.id;
}

export function getIdByTypeNode(ctx: CompilerContext, typeNode: TypeNode): ID {
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
