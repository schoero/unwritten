import { ClassLikeDeclaration, HeritageClause, NodeArray, Symbol, Type } from "typescript";

import { isExpression } from "../../typeguards/types.js";
import { CompilerContext } from "../../types/context.js";
import { Class, Expression, Kind } from "../../types/types.js";
import { assert } from "../../utils/general.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getModifiersByDeclaration } from "../compositions/modifiers.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { parseTypeNode } from "../entry-points/type-node.js";
import {
  isClassDeclaration,
  isConstructorDeclaration,
  isGetterDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  isSetterDeclaration
} from "../typeguards/declarations.js";
import { lockSymbol } from "../utils/ts.js";
import { createConstructorBySymbol } from "./constructor.js";
import { createGetterBySymbol } from "./getter.js";
import { createMethodBySymbol } from "./method.js";
import { createPropertyBySymbol } from "./property.js";
import { createSetterBySymbol } from "./setter.js";
import { createTypeParameterByDeclaration } from "./type-parameter.js";


export const createClassBySymbol = (ctx: CompilerContext, symbol: Symbol): Class => lockSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(declaration), "Class declaration is not found");

  const fromDeclaration = _parseClassDeclaration(ctx, declaration);
  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return {
    ...fromDeclaration,
    id,
    name
  };

});


function _parseClassDeclaration(ctx: CompilerContext, declaration: ClassLikeDeclaration): Omit<Class, "name"> {

  const constructorDeclarations = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isConstructorDeclaration);
  const getterDeclarations = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isGetterDeclaration);
  const setterDeclarations = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isSetterDeclaration);
  const methodDeclarations = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isMethodDeclaration);
  const propertyDeclarations = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isPropertyDeclaration);

  const ctor = constructorDeclarations.map(symbol => createConstructorBySymbol(ctx, symbol))[0];
  const getters = getterDeclarations.map(symbol => createGetterBySymbol(ctx, symbol));
  const setters = setterDeclarations.map(symbol => createSetterBySymbol(ctx, symbol));
  const methods = methodDeclarations.map(symbol => createMethodBySymbol(ctx, symbol));
  const properties = propertyDeclarations.map(symbol => createPropertyBySymbol(ctx, symbol));

  const heritage = declaration.heritageClauses && _parseHeritageClauses(ctx, declaration.heritageClauses);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterByDeclaration(ctx, typeParameter));
  const position = getPositionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const id = getIdByDeclaration(ctx, declaration);
  const kind = Kind.Class;

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


export function createClassByType(ctx: CompilerContext, type: Type): Class {

  return createClassBySymbol(ctx, type.symbol);

  // const methods = type.getProperties().filter(p => p.valueDeclaration && isMethodDeclaration(p.valueDeclaration)).map(createMethodBySymbol);
  // const properties = type.getProperties().filter(p => p.valueDeclaration && isPropertyDeclaration(p.valueDeclaration)).map(createPropertyBySymbol);
  // const setters = type.getProperties().filter(p => p.valueDeclaration && isSetterDeclaration(p.valueDeclaration)).map(createSetterBySymbol);
  // const getters = type.getProperties().filter(p => p.valueDeclaration && isGetterDeclaration(p.valueDeclaration)).map(createGetterBySymbol);

  // const id = getIdByType(ctx, type);
  // const kind = EntityKind.Class;

  // return {
  //   getters,
  //   id,
  //   kind,
  //   methods,
  //   properties,
  //   setters
  // };

}


function _getSymbolsByTypeFromClassLikeDeclaration(ctx: CompilerContext, classLikeDeclaration: ClassLikeDeclaration,
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


function _parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): Expression[] {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(typeNode => parseTypeNode(ctx, typeNode)))
    .filter(isExpression);
}
