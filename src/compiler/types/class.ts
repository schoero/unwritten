import { ClassLikeDeclaration, HeritageClause, Symbol, Type } from "typescript";
import { assert } from "vitest";

import {
  isClassDeclaration,
  isConstructorDeclaration,
  isGetterDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  isSetterDeclaration
} from "../../typeguards/ts.js";
import { Class, EntityKind, Getter, Method, Property, Setter } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getContext } from "../context/index.js";
import { createConstructorBySymbol } from "./constructor.js";
import { createGetterBySymbol } from "./getter.js";
import { createMethodBySymbol } from "./method.js";
import { createPropertyBySymbol } from "./property.js";
import { createSetterBySymbol } from "./setter.js";


export function createClassBySymbol(symbol: Symbol): Class {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(declaration), "Class declaration is not found");

  const fromDeclaration = createClassByDeclaration(declaration);
  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);

  return {
    ...fromDeclaration,
    id,
    name
  };

}


export function createClassByDeclaration(declaration: ClassLikeDeclaration): Class {

  const ctor = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isConstructorDeclaration).map(createConstructorBySymbol)[0];
  const getters = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isGetterDeclaration).map(createGetterBySymbol);
  const methods = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isMethodDeclaration).map(createMethodBySymbol);
  const properties = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isPropertyDeclaration).map(createPropertyBySymbol);
  const setters = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isSetterDeclaration).map(createSetterBySymbol);

  const heritage = declaration.heritageClauses?.map(_createClassByHeritageClause)[0];

  const position = getPositionByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const description = getDescriptionByDeclaration(declaration);

  const id = getIdByDeclaration(declaration);
  const kind = EntityKind.Class;

  return {
    ctor,
    description,
    example,
    getters: _mergeWithInheritedClass(getters, heritage?.getters ?? []),
    heritage,
    id,
    kind,
    methods: _mergeWithInheritedClass(methods, heritage?.methods ?? []),
    position,
    properties: _mergeWithInheritedClass(properties, heritage?.properties ?? []),
    setters: _mergeWithInheritedClass(setters, heritage?.setters ?? [])
  };

}


export function createClassByType(type: Type): Class {

  return createClassBySymbol(type.symbol);

  // const methods = type.getProperties().filter(p => p.valueDeclaration && isMethodDeclaration(p.valueDeclaration)).map(createMethodBySymbol);
  // const properties = type.getProperties().filter(p => p.valueDeclaration && isPropertyDeclaration(p.valueDeclaration)).map(createPropertyBySymbol);
  // const setters = type.getProperties().filter(p => p.valueDeclaration && isSetterDeclaration(p.valueDeclaration)).map(createSetterBySymbol);
  // const getters = type.getProperties().filter(p => p.valueDeclaration && isGetterDeclaration(p.valueDeclaration)).map(createGetterBySymbol);

  // const id = getIdByType(type);
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


function _getSymbolsByTypeFromClassLikeDeclaration(classLikeDeclaration: ClassLikeDeclaration,
  filter:
  | typeof isConstructorDeclaration
  | typeof isGetterDeclaration
  | typeof isMethodDeclaration
  | typeof isPropertyDeclaration
  | typeof isSetterDeclaration) {

  const declarations = classLikeDeclaration.members.filter(filter);

  const symbols = declarations.reduce((acc, declaration) => {
    // @ts-expect-error
    const symbol = getContext().checker.getSymbolAtLocation(classLikeDeclaration) ?? declaration.symbol;
    if(symbol !== undefined && acc.includes(symbol) === false){
      acc.push(symbol);
    }
    return acc;
  }, <Symbol[]>[]);

  return symbols;

}


function _createClassByHeritageClause(heritageClause: HeritageClause): Class {
  const typeNode = heritageClause.types[0]!;
  const type = getContext().checker.getTypeFromTypeNode(typeNode);
  return createClassByType(type);
}


function _mergeWithInheritedClass<T extends Getter | Method | Property | Setter>(fromClass: T[], fromInheritedClass: T[]): T[] {

  const merged = [...fromInheritedClass, ...fromClass];

  return merged.filter((item, index) => {
    const indices = merged.reduce((acc, i, idx) => {
      if(item.name === i.name){
        acc.push(idx);
      }
      return acc;
    }, <number[]>[]);
    return indices.length < 2 || index === indices[0];
  });

}