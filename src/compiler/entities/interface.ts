import { HeritageClause, InterfaceDeclaration, NodeArray, Symbol, Type } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Interface, Kind, MergedInterface } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isGetterSignatureDeclaration,
  isInterfaceDeclaration,
  isMethodSignatureDeclaration,
  isPropertySignatureDeclaration,
  isSetterSignatureDeclaration
} from "../typeguards/declarations.js";
import { lockSymbol } from "../utils/ts.js";
import { createPropertyByDeclaration } from "./property.js";
import { createSignatureByDeclaration } from "./signature.js";
import { createTypeParameterByDeclaration } from "./type-parameter.js";


export const createInterfaceBySymbol = (ctx: CompilerContext, symbol: Symbol): Interface | MergedInterface => lockSymbol(ctx, symbol, () => {

  const declarations = symbol.getDeclarations()?.filter(isInterfaceDeclaration);

  assert(declarations && declarations.length > 0, "Interface declarations not found");

  const name = getNameBySymbol(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclarations = declarations.map(declaration => _parseInterfaceDeclaration(ctx, declaration));
  const kind = Kind.Interface;

  const properties = _mergeMembers(fromDeclarations, "properties");
  const callSignatures = _mergeMembers(fromDeclarations, "callSignatures");
  const constructSignatures = _mergeMembers(fromDeclarations, "constructSignatures");
  const methodSignatures = _mergeMembers(fromDeclarations, "methodSignatures");
  const getterSignatures = _mergeMembers(fromDeclarations, "getterSignatures");
  const setterSignatures = _mergeMembers(fromDeclarations, "setterSignatures");


  if(fromDeclarations.length === 1){
    return <Interface>{
      ...fromDeclarations[0],
      callSignatures,
      constructSignatures,
      description,
      getterSignatures,
      id,
      kind,
      methodSignatures,
      name,
      properties,
      setterSignatures
    };
  } else {
    return <MergedInterface>{
      callSignatures,
      constructSignatures,
      declarations: fromDeclarations,
      description,
      getterSignatures,
      id,
      kind,
      methodSignatures,
      name,
      properties,
      setterSignatures
    };
  }

});


export function createInterfaceByType(ctx: CompilerContext, type: Type): Interface {
  return createInterfaceBySymbol(ctx, type.symbol);
}

function _mergeMembers<Key extends keyof {
  [Key in keyof Interface as Interface[Key] extends any[] ? Key : never]: Interface[Key]
}>(interfaces: (Interface | ReturnType<typeof _parseInterfaceDeclaration>)[], key: Key): Interface[Key] {
  // @ts-expect-error - TypeScript limitation https://github.com/microsoft/TypeScript/issues/51182
  return interfaces.reduce<Interface[Key]>((acc, declaration) => [
    ...acc,
    // @ts-expect-error - TypeScript limitation https://github.com/microsoft/TypeScript/issues/51182
    ...declaration.heritage?.flatMap(heritage => heritage[key]) ?? [],
    ...declaration[key]
  ], []);
}


function _parseInterfaceDeclaration(ctx: CompilerContext, declaration: InterfaceDeclaration) {

  const tsConstructSignatures = declaration.members.filter(isConstructSignatureDeclaration);
  const tsCallSignatures = declaration.members.filter(isCallSignatureDeclaration);
  const tsMethods = declaration.members.filter(isMethodSignatureDeclaration);
  const tsProperties = declaration.members.filter(isPropertySignatureDeclaration);
  const tsGetters = declaration.members.filter(isGetterSignatureDeclaration);
  const tsSetters = declaration.members.filter(isSetterSignatureDeclaration);

  const constructSignatures = tsConstructSignatures.map(signature => createSignatureByDeclaration(ctx, signature));
  const callSignatures = tsCallSignatures.map(signature => createSignatureByDeclaration(ctx, signature));
  const methodSignatures = tsMethods.map(signature => createSignatureByDeclaration(ctx, signature));
  const properties = tsProperties.map(declaration => createPropertyByDeclaration(ctx, declaration));
  const getterSignatures = tsGetters.map(signature => createSignatureByDeclaration(ctx, signature));
  const setterSignatures = tsSetters.map(signature => createSignatureByDeclaration(ctx, signature));

  const heritage = declaration.heritageClauses && _parseHeritageClauses(ctx, declaration.heritageClauses);
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterByDeclaration(ctx, typeParameter));
  const id = getIdByDeclaration(ctx, declaration);
  const kind = Kind.Interface;

  return {
    callSignatures,
    constructSignatures,
    example,
    getterSignatures,
    heritage,
    id,
    kind,
    methodSignatures,
    position,
    properties,
    setterSignatures,
    typeParameters
  };

}


function _parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): Interface[] {
  return heritageClauses.flatMap(heritageClause => _createInterfacesByHeritageClause(ctx, heritageClause));
}

function _createInterfacesByHeritageClause(ctx: CompilerContext, heritageClause: HeritageClause): Interface[] {
  const typeNodes = heritageClause.types;
  const types = typeNodes.map(ctx.checker.getTypeFromTypeNode);
  return types.map(type => createInterfaceByType(ctx, type));
}
