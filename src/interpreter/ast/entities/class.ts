import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import {
  createConstructorEntity,
  createGetterEntity,
  createMethodEntity,
  createPropertyEntity,
  createSetterEntity,
  createTypeParameterEntity
} from "unwritten:interpreter:ast/entities/index.js";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getDescriptionByDeclaration, getJSDocTagsByDeclaration } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { createExpressionType } from "unwritten:interpreter:ast/types/index.js";
import {
  isClassDeclaration,
  isConstructorDeclaration,
  isGetterDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  isSetterDeclaration
} from "unwritten:interpreter:typeguards/declarations.js";
import { isExpressionType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { ClassLikeDeclaration, HeritageClause, NodeArray, Symbol } from "typescript";

import type { ClassEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { ExpressionType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createClassEntity(ctx: InterpreterContext, symbol: Symbol): ClassEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(declaration), "Class declaration is not found");

  const fromDeclaration = parseClassDeclaration(ctx, declaration);
  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return {
    ...fromDeclaration,
    name,
    symbolId
  };

}


function parseClassDeclaration(ctx: InterpreterContext, declaration: ClassLikeDeclaration): Omit<ClassEntity, "name" | "symbolId"> {

  const constructorDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isConstructorDeclaration);
  const getterDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isGetterDeclaration);
  const setterDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isSetterDeclaration);
  const methodDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isMethodDeclaration);
  const propertyDeclarations = getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isPropertyDeclaration);

  const ctor = constructorDeclarations.map(symbol => createConstructorEntity(ctx, symbol))[0];
  const getters = getterDeclarations.map(symbol => createGetterEntity(ctx, symbol));
  const setters = setterDeclarations.map(symbol => createSetterEntity(ctx, symbol));
  const methods = methodDeclarations.map(symbol => createMethodEntity(ctx, symbol));
  const properties = propertyDeclarations.map(symbol => createPropertyEntity(ctx, symbol));

  const heritage = declaration.heritageClauses && parseHeritageClauses(ctx, declaration.heritageClauses);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntity(ctx, typeParameter));
  const position = getPositionByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const declarationId = getDeclarationId(ctx, declaration);
  const kind = EntityKind.Class;

  return {
    ...jsdocTags,
    ctor,
    declarationId,
    description,
    getters,
    heritage,
    kind,
    methods,
    modifiers,
    position,
    properties,
    setters,
    typeParameters
  };

}


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

  const declarations = classLikeDeclaration.members.filter(filter);

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
    .flatMap(heritageClause => heritageClause.types.map(expression => createExpressionType(ctx, expression)))
    .filter(isExpressionType)[0];
}
