import { HeritageClause, InterfaceDeclaration, NodeArray, Symbol, Type } from "typescript";

import { isExpression } from "../../typeguards/types.js";
import { CompilerContext } from "../../types/context.js";
import { Expression, Interface, Kind, MergedInterface } from "../../types/types.js";
import { assert } from "../../utils/general.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameByDeclaration, getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { parseType } from "../entry-points/type.js";
import { parseTypeNode } from "../entry-points/type-node.js";
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

  const tsDeclarations = symbol.getDeclarations()?.filter(isInterfaceDeclaration);

  assert(tsDeclarations && tsDeclarations.length > 0, "Interface declarations not found");

  const name = getNameBySymbol(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const declarations = tsDeclarations.map(declaration => _parseInterfaceDeclaration(ctx, declaration));
  const kind = Kind.Interface;

  if(declarations.length === 1){
    return <Interface>{
      ...declarations[0],
      description,
      id,
      kind,
      name
    };
  } else {

    const properties = _mergeMembers(declarations, "properties");
    const callSignatures = _mergeMembers(declarations, "callSignatures");
    const constructSignatures = _mergeMembers(declarations, "constructSignatures");
    const methodSignatures = _mergeMembers(declarations, "methodSignatures");
    const getterSignatures = _mergeMembers(declarations, "getterSignatures");
    const setterSignatures = _mergeMembers(declarations, "setterSignatures");

    return <MergedInterface>{
      callSignatures,
      constructSignatures,
      declarations,
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

  const fromSymbol = createInterfaceBySymbol(ctx, type.symbol);
  // @ts-expect-error - Internal API
  const typeArguments = type.typeArguments?.map(type => parseType(ctx, type));

  return {
    ...fromSymbol,
    typeArguments
  };

}


function _mergeMembers<Key extends keyof {
  [Key in keyof Interface as Interface[Key] extends any[] ? Key : never]: Interface[Key]
}>(interfaces: Interface[], key: Key): Interface[Key] {
  // @ts-expect-error - TypeScript limitation https://github.com/microsoft/TypeScript/issues/51182
  return interfaces.reduce<Interface[Key]>((acc, declaration) => [
    ...acc,
    ...declaration[key]
  ], []);
}

function _parseInterfaceDeclaration(ctx: CompilerContext, declaration: InterfaceDeclaration): Interface {

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
  const name = getNameByDeclaration(ctx, declaration);
  const id = getIdByDeclaration(ctx, declaration);
  const kind = Kind.Interface;

  assert(name, "Interface name not found");

  return {
    callSignatures,
    constructSignatures,
    example,
    getterSignatures,
    heritage,
    id,
    kind,
    methodSignatures,
    name,
    position,
    properties,
    setterSignatures,
    typeParameters
  };

}


function _parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): Expression[] {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(typeNode => parseTypeNode(ctx, typeNode)))
    .filter(isExpression);
}
