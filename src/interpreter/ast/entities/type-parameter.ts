import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { isTypeParameterDeclaration } from "unwritten:interpreter:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import { getTypeByTypeNode } from "../type";

import type { Symbol, TypeParameter, TypeParameterDeclaration } from "typescript";

import type { TypeParameterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTypeParameterEntityByTypeParameter(ctx: InterpreterContext, typeParameter: TypeParameter): TypeParameterEntity {

  const symbol = typeParameter.symbol;
  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeParameterDeclaration(ctx, declaration), "Type parameter declaration not found");

  const symbolId = getSymbolId(ctx, symbol);
  const declarationId = getDeclarationId(ctx, declaration);
  const name = getNameBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const description = jsdocProperties.template?.[0]?.content;
  const initializer = declaration.default && getTypeByTypeNode(ctx, declaration.default);
  const constraint = declaration.constraint && getTypeByTypeNode(ctx, declaration.constraint);
  const kind = EntityKind.TypeParameter;

  return {
    constraint,
    declarationId,
    description,
    initializer,
    kind,
    name,
    position,
    symbolId
  };

}

export function createTypeParameterEntity(ctx: InterpreterContext, symbol: Symbol): TypeParameterEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeParameterDeclaration(ctx, declaration), "Type parameter declaration not found");

  const symbolId = getSymbolId(ctx, symbol);
  const declarationId = getDeclarationId(ctx, declaration);
  const name = getNameBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const description = jsdocProperties.template?.[0]?.content;
  const initializer = declaration.default && getTypeByTypeNode(ctx, declaration.default);
  const constraint = declaration.constraint && getTypeByTypeNode(ctx, declaration.constraint);
  const kind = EntityKind.TypeParameter;

  return {
    constraint,
    declarationId,
    description,
    initializer,
    kind,
    name,
    position,
    symbolId
  };

}


export function createTypeParameterEntityByDeclaration(ctx: InterpreterContext, declaration: TypeParameterDeclaration): TypeParameterEntity {

  assert(isTypeParameterDeclaration(ctx, declaration), "Declaration is not found");

  const symbol = ctx.checker.getSymbolAtLocation(declaration.name);

  assert(symbol, "Symbol is not found");

  const symbolId = getSymbolId(ctx, symbol);
  const declarationId = getDeclarationId(ctx, declaration);
  const name = getNameBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const description = jsdocProperties.template?.[0]?.content;
  const initializer = declaration.default && getTypeByTypeNode(ctx, declaration.default);
  const constraint = declaration.constraint && getTypeByTypeNode(ctx, declaration.constraint);
  const kind = EntityKind.TypeParameter;

  return {
    constraint,
    declarationId,
    description,
    initializer,
    kind,
    name,
    position,
    symbolId
  };

}
