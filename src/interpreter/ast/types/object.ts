import {
  createGetterEntity,
  createMethodEntity,
  createPropertyEntity,
  createSetterEntity,
  createSignatureEntity
} from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByType } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByType } from "unwritten:interpreter:ast/shared/position.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import {
  isGetterSymbol,
  isMethodSymbol,
  isPropertySymbol,
  isSetterSymbol
} from "unwritten:interpreter:typeguards/symbols.js";
import { isThisType } from "unwritten:interpreter:typeguards/types.js";
import { withLockedType } from "unwritten:interpreter:utils/ts.js";
import { isSymbolExcluded } from "unwritten:utils/exclude.js";

import type { ObjectType as TSObjectType } from "typescript";

import type { InferObjectLikeType, ObjectLikeTypeKinds } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export const createObjectLikeType = <ObjectLikeTypeKind extends ObjectLikeTypeKinds>(ctx: InterpreterContext, type: TSObjectType, kind: ObjectLikeTypeKind = TypeKind.Object as ObjectLikeTypeKind): InferObjectLikeType<ObjectLikeTypeKind> => withLockedType(ctx, type, () => {

  const tsConstructSignatures = type.getConstructSignatures();
  const tsCallSignatures = type.getCallSignatures();
  const tsProperties = type.getProperties();

  const getterProperties = tsProperties.filter(isGetterSymbol).filter(getter => !isSymbolExcluded(ctx, getter));
  const setterProperties = tsProperties.filter(isSetterSymbol).filter(setter => !isSymbolExcluded(ctx, setter));
  const propertyProperties = tsProperties.filter(isPropertySymbol).filter(property => !isSymbolExcluded(ctx, property));
  const methodProperties = tsProperties.filter(isMethodSymbol).filter(method => !isSymbolExcluded(ctx, method));

  const constructSignatures = tsConstructSignatures.map(signature => createSignatureEntity(ctx, signature));
  const callSignatures = tsCallSignatures.map(signature => createSignatureEntity(ctx, signature));

  const methods = methodProperties.map(property => createMethodEntity(ctx, property));
  const getters = getterProperties.map(property => createGetterEntity(ctx, property));
  const setters = setterProperties.map(property => createSetterEntity(ctx, property));
  const properties = propertyProperties.map(property => createPropertyEntity(ctx, property));

  const name = getNameByType(ctx, type);
  const symbolId = getSymbolId(ctx, type.symbol);
  const typeId = getTypeId(ctx, type);
  const position = getPositionByType(ctx, type);
  const isThis = isThisType(type);

  return <InferObjectLikeType<typeof kind>>{
    callSignatures,
    constructSignatures,
    getters,
    isThis,
    kind,
    methods,
    name,
    position,
    properties,
    setters,
    symbolId,
    typeId
  };

});
