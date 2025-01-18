import {
  createConstructorEntity,
  createGetterEntity,
  createMethodEntity,
  createPropertyEntity,
  createSetterEntity,
  createTypeParameterEntityByDeclaration
} from "unwritten:interpreter:ast/entities/index";
import { getDeclarationId, getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";
import { createExpressionType } from "unwritten:interpreter:ast/types/index";
import {
  isClassDeclaration,
  isConstructorDeclaration,
  isGetterDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  isSetterDeclaration
} from "unwritten:interpreter:typeguards/declarations";
import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { withCachedEntity, withLockedSymbol } from "unwritten:interpreter/utils/ts";
import { isExpressionType } from "unwritten:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { ClassLikeDeclaration, HeritageClause, NodeArray, Symbol } from "typescript";
import type { ClassEntity } from "unwritten:interpreter:type-definitions/entities";
import type { ExpressionType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createClassEntity = (ctx: InterpreterContext, symbol: Symbol): ClassEntity => withCachedEntity(ctx, symbol, () => withLockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(ctx, declaration), "Class declaration is not found");

  const type = ctx.checker.getDeclaredTypeOfSymbol(symbol);

  const typeId = getTypeId(ctx, type);
  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  const constructorDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isConstructorDeclaration);
  const getterDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isGetterDeclaration);
  const setterDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isSetterDeclaration);
  const methodDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isMethodDeclaration);
  const propertyDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isPropertyDeclaration);

  const ctor = constructorDeclarations.map(symbol => createConstructorEntity(ctx, symbol))[0];
  const getters = getterDeclarations.map(symbol => createGetterEntity(ctx, symbol));
  const setters = setterDeclarations.map(symbol => createSetterEntity(ctx, symbol));
  const methods = methodDeclarations.map(symbol => createMethodEntity(ctx, symbol));
  const allProperties = propertyDeclarations.map(symbol => createPropertyEntity(ctx, symbol));

  const properties = allProperties.filter(property => property.eventProperty === undefined);
  const events = allProperties.filter(property => property.eventProperty === true);

  const heritage = declaration.heritageClauses && parseHeritageClauses(ctx, declaration.heritageClauses);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntityByDeclaration(ctx, typeParameter));
  const position = getPositionByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const declarationId = getDeclarationId(ctx, declaration);
  const kind = EntityKind.Class;

  return {
    ...jsdocProperties,
    ctor,
    declarationId,
    events,
    getters,
    heritage,
    kind,
    methods,
    modifiers,
    name,
    position,
    properties,
    setters,
    symbolId,
    typeId,
    typeParameters
  };

}));


function getSymbolsByTypeFromClassLikeDeclaration(
  ctx: InterpreterContext,
  classLikeDeclaration: ClassLikeDeclaration,
  filter:
    | typeof isConstructorDeclaration
    | typeof isGetterDeclaration
    | typeof isMethodDeclaration
    | typeof isPropertyDeclaration
    | typeof isSetterDeclaration
) {

  const declarations = classLikeDeclaration.members.filter(member => filter(ctx, member));

  const symbols = declarations.reduce<Symbol[]>((acc, declaration) => {
    // @ts-expect-error - Internal API
    const symbol = ctx.checker.getSymbolAtLocation(classLikeDeclaration) ?? declaration.symbol;
    if(symbol !== undefined && acc.includes(symbol) === false){
      acc.push(symbol);
    }
    return acc;
  }, []);

  return symbols;

}


function parseHeritageClauses(ctx: InterpreterContext, heritageClauses: NodeArray<HeritageClause>): ExpressionType {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(
      expression => createExpressionType(ctx, expression)
    ))
    .filter(isExpressionType)[0];
}
