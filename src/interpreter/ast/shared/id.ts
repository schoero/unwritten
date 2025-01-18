import type { Declaration, Symbol, Type, TypeNode } from "typescript";
import type { ID } from "unwritten:interpreter:type-definitions/jsdoc";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function getSymbolId(ctx: InterpreterContext, symbol: Symbol): ID {
  ensureSymbolHasId(ctx, symbol);
  // @ts-expect-error - Internal API
  return symbol.id;
}

export function getDeclarationId(ctx: InterpreterContext, declaration: Declaration): ID {
  ensureDeclarationHasId(ctx, declaration);
  // @ts-expect-error - Internal API
  return declaration.id;
}

export function getSymbolIdByDeclaration(ctx: InterpreterContext, declaration: Declaration): ID | undefined {
  // @ts-expect-error - Internal API
  const symbol = declaration.symbol ?? ctx.checker.getSymbolAtLocation(declaration);
  return symbol && getSymbolId(ctx, symbol);
}

export function getSymbolIdByType(ctx: InterpreterContext, type: Type): ID | undefined {
  const symbol = type.symbol as Symbol | undefined;
  return symbol && getSymbolId(ctx, symbol);
}

export function getTypeId(ctx: InterpreterContext, type: Type): ID {
  ensureTypeHasId(ctx, type);
  // @ts-expect-error - Internal API
  return type.id;
}

export function getIdByTypeNode(ctx: InterpreterContext, typeNode: TypeNode): ID {
  ensureTypeNodeHasId(ctx, typeNode);
  // @ts-expect-error - Internal API
  return typeNode.id;
}


export function ensureSymbolHasId(ctx: InterpreterContext, symbol: Symbol) {

  // If a symbol has no id, we need to let it interact with the checker to get an id.

  // @ts-expect-error - Internal API
  if(!symbol.id){
    ctx.checker.symbolToString(symbol);
  }

}

export function ensureDeclarationHasId(ctx: InterpreterContext, declaration: Declaration) {

  // If a declaration has no id, we need to let it interact with the checker to get an id.

  // @ts-expect-error - Internal API
  if(!declaration.id){
    ctx.checker.getSymbolAtLocation(declaration);
  }

}


export function ensureTypeHasId(ctx: InterpreterContext, type: Type) {

  // If a type has no id, we need to let it interact with the checker to get an id.

  // @ts-expect-error - Internal API
  if(!type.id){
    ctx.checker.typeToString(type);
  }

}


export function ensureTypeNodeHasId(ctx: InterpreterContext, typeNode: TypeNode) {

  // If a typeNode has no id, we need to let it interact with the checker to get an id.

  // @ts-expect-error - Internal API
  if(!typeNode.id){
    ctx.checker.getTypeFromTypeNode(typeNode);
  }

}
