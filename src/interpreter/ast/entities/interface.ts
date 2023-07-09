import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { withLockedSymbolType } from "unwritten:interpreter/utils/ts.js";
import {
  createPropertyEntity,
  createSignatureEntity,
  createTypeParameterEntity
} from "unwritten:interpreter:ast/entities/index.js";
import { getDeclarationId, getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getNameByDeclaration, getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { createExpressionType } from "unwritten:interpreter:ast/types/index.js";
import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isGetterDeclaration,
  isInterfaceDeclaration,
  isMethodSignatureDeclaration,
  isPropertySignatureDeclaration,
  isSetterDeclaration
} from "unwritten:interpreter:typeguards/declarations.js";
import { isExpressionType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { HeritageClause, InterfaceDeclaration, NodeArray, Symbol } from "typescript";

import type { InterfaceEntity, MergedInterfaceEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { ExpressionType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";
import type { PartialByKey } from "unwritten:type-definitions/utils.js";


export const createInterfaceEntity = (ctx: InterpreterContext, symbol: Symbol): InterfaceEntity | MergedInterfaceEntity => withLockedSymbolType(ctx, symbol, () => {

  const declarations = symbol.getDeclarations()?.filter(isInterfaceDeclaration);

  assert(declarations && declarations.length > 0, "Interface declarations not found");

  const type = ctx.checker.getDeclaredTypeOfSymbol(symbol);

  const typeId = getTypeId(ctx, type);
  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  const description = getDescriptionBySymbol(ctx, symbol);
  const parsedDeclarations = declarations.map(declaration => parseInterfaceDeclaration(ctx, declaration));
  const kind = EntityKind.Interface;

  if(parsedDeclarations.length === 1){
    return <InterfaceEntity>{
      ...parsedDeclarations[0],
      description,
      kind,
      name,
      symbolId,
      typeId
    };
  } else {

    const properties = mergeMembers(parsedDeclarations, "properties");
    const callSignatures = mergeMembers(parsedDeclarations, "callSignatures");
    const constructSignatures = mergeMembers(parsedDeclarations, "constructSignatures");
    const methodSignatures = mergeMembers(parsedDeclarations, "methodSignatures");
    const getterSignatures = mergeMembers(parsedDeclarations, "getterSignatures");
    const setterSignatures = mergeMembers(parsedDeclarations, "setterSignatures");
    const typeParameters = parsedDeclarations[0].typeParameters; // All declarations must have the same type parameters

    return <MergedInterfaceEntity>{
      callSignatures,
      constructSignatures,
      declarations: parsedDeclarations,
      description,
      getterSignatures,
      kind,
      methodSignatures,
      name,
      properties,
      setterSignatures,
      symbolId,
      typeParameters
    };

  }

});


function mergeMembers<Key extends keyof {
  [Key in keyof InterfaceEntity as InterfaceEntity[Key] extends any[]
    ? Key
    : never
  ]: InterfaceEntity[Key]
}>(interfaces: ReturnType<typeof parseInterfaceDeclaration>[], key: Key): InterfaceEntity[Key] {
  // @ts-expect-error - TypeScript limitation https://github.com/microsoft/TypeScript/issues/51182
  return interfaces.reduce<InterfaceEntity[Key]>((acc, declaration) => [
    ...acc,
    ...declaration[key]
  ], []);
}


function parseInterfaceDeclaration(ctx: InterpreterContext, declaration: InterfaceDeclaration): PartialByKey<InterfaceEntity, "symbolId" | "typeId"> {

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
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntity(ctx, typeParameter));

  const declarationId = getDeclarationId(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const kind = EntityKind.Interface;

  assert(name, "Interface name not found");

  return {
    ...jsdocTags,
    callSignatures,
    constructSignatures,
    declarationId,
    getterSignatures,
    heritage,
    kind,
    methodSignatures,
    name,
    position,
    properties,
    setterSignatures,
    typeParameters
  };

}


function parseHeritageClauses(ctx: InterpreterContext, heritageClauses: NodeArray<HeritageClause>): ExpressionType[] {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(expression => createExpressionType(ctx, expression)))
    .filter(isExpressionType);
}
