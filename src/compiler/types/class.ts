import { ClassLikeDeclaration, Symbol, Type } from "typescript";
import { assert } from "vitest";

import {
  isClassDeclaration,
  isConstructorDeclaration,
  isGetterDeclaration,
  isMethodDeclaration,
  isPropertyDeclaration,
  isSetterDeclaration
} from "../../typeguards/ts.js";
import { Class, ClassInstance, EntityKind, FromDeclaration, FromSymbol, FromType } from "../../types/types.js";
import { getIdByDeclaration, getIdByType } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getContext } from "../context/index.js";
import { createConstructorBySymbol } from "./constructor.js";
import { createGetterBySymbol } from "./getter.js";
import { createMethodBySymbol } from "./method.js";
import { createPropertyBySymbol } from "./property.js";
import { createSetterBySymbol } from "./setter.js";


export function createClassBySymbol(symbol: Symbol): FromSymbol<Class> {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(declaration), "Class declaration is not found");

  const fromDeclaration = createClassByDeclaration(declaration);
  const name = getNameBySymbol(symbol);

  return {
    ...fromDeclaration,
    name: name
  };

}


export function createClassByDeclaration(declaration: ClassLikeDeclaration): FromDeclaration<Class> {

  const ctor = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isConstructorDeclaration).map(createConstructorBySymbol)[0];
  const getters = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isGetterDeclaration).map(createGetterBySymbol);
  const methods = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isMethodDeclaration).map(createMethodBySymbol);
  const properties = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isPropertyDeclaration).map(createPropertyBySymbol);
  const setters = _getSymbolsByTypeFromClassLikeDeclaration(declaration, isSetterDeclaration).map(createSetterBySymbol);

  const position = getPositionByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const description = getDescriptionByDeclaration(declaration);

  const id = getIdByDeclaration(declaration);
  const kind = EntityKind.Class;

  return {
    id,
    kind,
    ctor,
    methods,
    properties,
    setters,
    getters,
    position,
    example,
    description
  };

}


export function createClassByType(type: Type): FromType<ClassInstance> {

  const methods = type.getProperties().filter(p => p.valueDeclaration && isMethodDeclaration(p.valueDeclaration)).map(createMethodBySymbol);
  const properties = type.getProperties().filter(p => p.valueDeclaration && isPropertyDeclaration(p.valueDeclaration)).map(createPropertyBySymbol);
  const setters = type.getProperties().filter(p => p.valueDeclaration && isSetterDeclaration(p.valueDeclaration)).map(createSetterBySymbol);
  const getters = type.getProperties().filter(p => p.valueDeclaration && isGetterDeclaration(p.valueDeclaration)).map(createGetterBySymbol);

  const id = getIdByType(type);
  const kind = EntityKind.ClassInstance;

  return {
    id,
    kind,
    methods,
    properties,
    setters,
    getters
  };

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


// function _getSymbolsByTypeFromClassLikeDeclaration(classLikeDeclaration: ClassLikeDeclaration, flags: SymbolFlags) {
//   const symbols = getContext().checker.getSymbolsInScope(classLikeDeclaration.name!, flags);
//   return symbols;
// }