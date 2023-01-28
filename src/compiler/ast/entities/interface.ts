import { createPropertyEntity, createSignatureEntity, createTypeParameterEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByDeclaration, getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "quickdoks:compiler:mixins/jsdoc.js";
import { getNameByDeclaration, getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isGetterDeclaration,
  isInterfaceDeclaration,
  isMethodSignatureDeclaration,
  isPropertySignatureDeclaration,
  isSetterDeclaration
} from "quickdoks:compiler:typeguards/declarations.js";
import { createExpressionType } from "quickdoks:compiler:types";
import { isExpressionType } from "quickdoks:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { HeritageClause, InterfaceDeclaration, NodeArray, Symbol } from "typescript";

import type { InterfaceEntity, MergedInterfaceEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { ExpressionType } from "quickdoks:compiler:type-definitions/types.js";
import type { CompilerContext } from "quickdoks:types:context.d.js";


export function createInterfaceEntity(ctx: CompilerContext, symbol: Symbol): InterfaceEntity | MergedInterfaceEntity {

  const tsDeclarations = symbol.getDeclarations()?.filter(isInterfaceDeclaration);

  assert(tsDeclarations && tsDeclarations.length > 0, "Interface declarations not found");

  const name = getNameBySymbol(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const declarations = tsDeclarations.map(declaration => parseInterfaceDeclaration(ctx, declaration));
  const kind = EntityKind.Interface;

  if(declarations.length === 1){
    return <InterfaceEntity>{
      ...declarations[0],
      description,
      id,
      kind,
      name
    };
  } else {

    const properties = mergeMembers(declarations, "properties");
    const callSignatures = mergeMembers(declarations, "callSignatures");
    const constructSignatures = mergeMembers(declarations, "constructSignatures");
    const methodSignatures = mergeMembers(declarations, "methodSignatures");
    const getterSignatures = mergeMembers(declarations, "getterSignatures");
    const setterSignatures = mergeMembers(declarations, "setterSignatures");
    const typeParameters = declarations[0].typeParameters; // All declarations must have the same type parameters

    return <MergedInterfaceEntity>{
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
      setterSignatures,
      typeParameters
    };

  }

}


function mergeMembers<Key extends keyof {
  [Key in keyof InterfaceEntity as InterfaceEntity[Key] extends any[] ? Key : never]: InterfaceEntity[Key]
}>(interfaces: InterfaceEntity[], key: Key): InterfaceEntity[Key] {
  // @ts-expect-error - TypeScript limitation https://github.com/microsoft/TypeScript/issues/51182
  return interfaces.reduce<Interface[Key]>((acc, declaration) => [
    ...acc,
    ...declaration[key]
  ], []);
}

function parseInterfaceDeclaration(ctx: CompilerContext, declaration: InterfaceDeclaration): InterfaceEntity {

  const tsConstructSignatures = declaration.members.filter(isConstructSignatureDeclaration);
  const tsCallSignatures = declaration.members.filter(isCallSignatureDeclaration);
  const tsMethods = declaration.members.filter(isMethodSignatureDeclaration);
  const tsGetters = declaration.members.filter(isGetterDeclaration);
  const tsSetters = declaration.members.filter(isSetterDeclaration);
  const tsProperties = declaration.members.filter(isPropertySignatureDeclaration);

  const constructSignatures = tsConstructSignatures.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Construct signature not found");
    return createSignatureEntity(ctx, signature);
  });
  const callSignatures = tsCallSignatures.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Call signature not found");
    return createSignatureEntity(ctx, signature);
  });
  const methodSignatures = tsMethods.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Method signature not found");
    return createSignatureEntity(ctx, signature);
  });
  const getterSignatures = tsGetters.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Getter signature not found");
    return createSignatureEntity(ctx, signature);
  });
  const setterSignatures = tsSetters.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Setter signature not found");
    return createSignatureEntity(ctx, signature);
  });
  const properties = tsProperties.map(signature => {
    const symbol = ctx.checker.getSymbolAtLocation(signature.name);
    assert(symbol, "Property symbol not found");
    return createPropertyEntity(ctx, symbol);
  });

  const heritage = declaration.heritageClauses && parseHeritageClauses(ctx, declaration.heritageClauses);
  const position = getPositionByDeclaration(ctx, declaration);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntity(ctx, typeParameter));
  const name = getNameByDeclaration(ctx, declaration);
  const id = getIdByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const kind = EntityKind.Interface;

  assert(name, "Interface name not found");

  return {
    callSignatures,
    constructSignatures,
    getterSignatures,
    heritage,
    id,
    kind,
    methodSignatures,
    name,
    position,
    properties,
    setterSignatures,
    typeParameters,
    ...jsdocTags
  };

}


function parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): ExpressionType[] {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(expression => createExpressionType(ctx, expression)))
    .filter(isExpressionType);
}
