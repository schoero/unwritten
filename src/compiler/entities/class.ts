import { ClassLikeDeclaration, HeritageClause, Symbol, Type } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Class, Getter, Kind, Method, Property, Setter } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getModifiersByDeclaration } from "../compositions/modifiers.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
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

  const ctor = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isConstructorDeclaration).map(symbol => createConstructorBySymbol(ctx, symbol))[0];
  const getters = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isGetterDeclaration).map(symbol => createGetterBySymbol(ctx, symbol));
  const methods = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isMethodDeclaration).map(symbol => createMethodBySymbol(ctx, symbol));
  const properties = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isPropertyDeclaration).map(symbol => createPropertyBySymbol(ctx, symbol));
  const setters = _getSymbolsByTypeFromClassLikeDeclaration(ctx, declaration, isSetterDeclaration).map(symbol => createSetterBySymbol(ctx, symbol));

  const heritage = declaration.heritageClauses?.map(declaration => _createClassByHeritageClause(ctx, declaration))[0];

  const position = getPositionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterByDeclaration(ctx, typeParameter));

  const id = getIdByDeclaration(ctx, declaration);
  const kind = Kind.Class;

  return {
    ctor,
    description,
    example,
    getters: _mergeWithInheritedClass(getters, heritage?.getters ?? []),
    heritage,
    id,
    kind,
    methods: _mergeWithInheritedClass(methods, heritage?.methods ?? []),
    modifiers,
    position,
    properties: _mergeWithInheritedClass(properties, heritage?.properties ?? []),
    setters: _mergeWithInheritedClass(setters, heritage?.setters ?? []),
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


function _createClassByHeritageClause(ctx: CompilerContext, heritageClause: HeritageClause): Class {
  const typeNode = heritageClause.types[0]!;
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createClassByType(ctx, type);
}


function _mergeWithInheritedClass<T extends Getter | Method | Property | Setter>(fromClass: T[], fromInheritedClass: T[]): T[] {

  const merged = [...fromInheritedClass, ...fromClass];

  return merged.filter((item, index) => {
    const indices = merged.reduce<number[]>((acc, i, idx) => {
      if(item.name === i.name){
        acc.push(idx);
      }
      return acc;
    }, []);
    return indices.length < 2 || index === indices[0];
  });

}
