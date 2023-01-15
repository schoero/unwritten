import {
  createConstructorEntity,
  createGetterEntity,
  createMethodEntity,
  createPropertyEntity,
  createSetterEntity,
  createTypeParameterEntity
} from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByDeclaration, getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "quickdoks:compiler:mixins/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:mixins/modifiers.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import {
  isClassDeclaration,
  isConstructorDeclaration,
  isGetterDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  isSetterDeclaration
} from "quickdoks:compiler:typeguards/declarations.js";
import { createExpressionType } from "quickdoks:compiler:types";
import { isExpressionType } from "quickdoks:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { ClassLikeDeclaration, HeritageClause, NodeArray, Symbol } from "typescript";

import type { ExpressionType } from "quickdoks:compiler/type-definitions/types.js";
import type { ClassEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:types:context.d.js";


export function createClassEntity(ctx: CompilerContext, symbol: Symbol): ClassEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(declaration), "Class declaration is not found");

  const fromDeclaration = parseClassDeclaration(ctx, declaration);
  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return {
    ...fromDeclaration,
    id,
    name
  };

}


function parseClassDeclaration(ctx: CompilerContext, declaration: ClassLikeDeclaration): Omit<ClassEntity, "name"> {

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
  const example = getExampleByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const id = getIdByDeclaration(ctx, declaration);
  const kind = EntityKind.Class;

  return {
    ctor,
    description,
    example,
    getters,
    heritage,
    id,
    kind,
    methods,
    modifiers,
    position,
    properties,
    setters,
    typeParameters
  };

}


function getSymbolsByTypeFromClassLikeDeclaration(ctx: CompilerContext, classLikeDeclaration: ClassLikeDeclaration,
  filter:
  | typeof isConstructorDeclaration
  | typeof isGetterDeclaration
  | typeof isMethodDeclaration
  | typeof isPropertyDeclaration
  | typeof isSetterDeclaration) {

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


function parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): ExpressionType {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(expression => createExpressionType(ctx, expression)))
    .filter(isExpressionType)[0];
}
