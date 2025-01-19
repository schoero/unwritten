import {
  createPropertyEntity,
  createSignatureEntity,
  createTypeParameterEntityByDeclaration
} from "unwritten:interpreter:ast/entities/index";
import { getDeclarationId, getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { getNameByDeclaration, getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";
import { createExpressionType } from "unwritten:interpreter:ast/types/index";
import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isGetterDeclaration,
  isInterfaceDeclaration,
  isMethodSignatureDeclaration,
  isPropertySignatureDeclaration,
  isSetterDeclaration
} from "unwritten:interpreter:typeguards/declarations";
import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { withCachedEntity, withLockedSymbol } from "unwritten:interpreter/utils/ts";
import { isExpressionType } from "unwritten:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { HeritageClause, InterfaceDeclaration, NodeArray, Symbol } from "typescript";

import type { InterfaceEntity, MergedInterfaceEntity } from "unwritten:interpreter:type-definitions/entities";
import type { ExpressionType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";
import type { PartialByKey } from "unwritten:type-definitions/utils";


export const createInterfaceEntity = (ctx: InterpreterContext, symbol: Symbol): InterfaceEntity | MergedInterfaceEntity => withCachedEntity(ctx, symbol, () => withLockedSymbol(ctx, symbol, () => {

  const interfaceDeclarations = symbol.getDeclarations()?.filter(declaration => isInterfaceDeclaration(ctx, declaration));

  assert(interfaceDeclarations && interfaceDeclarations.length > 0, "Interface declarations not found");

  const type = ctx.checker.getDeclaredTypeOfSymbol(symbol);

  const typeId = getTypeId(ctx, type);
  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  const declarations = interfaceDeclarations.map(declaration => parseInterfaceDeclaration(ctx, declaration));
  const kind = EntityKind.Interface;

  if(declarations.length === 1){
    return <InterfaceEntity>{
      ...declarations[0],
      kind,
      name,
      symbolId,
      typeId
    };
  } else {

    const properties = mergeMembers(declarations, "properties");
    const events = mergeMembers(declarations, "events");
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
      events,
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

}));


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

  const tsConstructSignatures = declaration.members.flatMap(member => isConstructSignatureDeclaration(ctx, member) ? member : []);
  const tsCallSignatures = declaration.members.flatMap(member => isCallSignatureDeclaration(ctx, member) ? member : []);
  const tsMethods = declaration.members.flatMap(member => isMethodSignatureDeclaration(ctx, member) ? member : []);
  const tsGetters = declaration.members.flatMap(member => isGetterDeclaration(ctx, member) ? member : []);
  const tsSetters = declaration.members.flatMap(member => isSetterDeclaration(ctx, member) ? member : []);
  const tsProperties = declaration.members.flatMap(member => isPropertySignatureDeclaration(ctx, member) ? member : []);

  const constructSignatures = tsConstructSignatures.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Construct signature not found");
    return createSignatureEntity(ctx, signature, EntityKind.ConstructSignature);
  });

  const callSignatures = tsCallSignatures.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Call signature not found");
    return createSignatureEntity(ctx, signature, EntityKind.CallSignature);
  });

  const methodSignatures = tsMethods.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Method signature not found");
    return createSignatureEntity(ctx, signature, EntityKind.MethodSignature);
  });

  const setterSignatures = tsSetters.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Setter signature not found");
    return createSignatureEntity(ctx, signature, EntityKind.SetterSignature);
  });

  const getterSignatures = tsGetters.map(signatureDeclaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(signatureDeclaration);
    assert(signature, "Getter signature not found");
    return createSignatureEntity(ctx, signature, EntityKind.GetterSignature);
  });

  const allProperties = tsProperties.map(signature => {
    const symbol = ctx.checker.getSymbolAtLocation(signature.name);
    assert(symbol, "Property symbol not found");
    return createPropertyEntity(ctx, symbol);
  });

  const properties = allProperties.filter(property => property.eventProperty === undefined);
  const events = allProperties.filter(property => property.eventProperty === true);

  const heritage = declaration.heritageClauses && parseHeritageClauses(ctx, declaration.heritageClauses);
  const typeParameters = declaration.typeParameters?.map(
    typeParameter => createTypeParameterEntityByDeclaration(ctx, typeParameter)
  );

  const declarationId = getDeclarationId(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const kind = EntityKind.Interface;

  assert(name, "Interface name not found");

  return {
    ...jsdocProperties,
    callSignatures,
    constructSignatures,
    declarationId,
    events,
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
    .flatMap(heritageClause => heritageClause.types.map(
      expression => createExpressionType(ctx, expression)
    ))
    .filter(isExpressionType);
}
