import {
  createGetterEntity,
  createMethodEntity,
  createPropertyEntity,
  createSetterEntity,
  createSignatureEntity
} from "unwritten:interpreter:ast/entities/index";
import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { getNameByType } from "unwritten:interpreter:ast/shared/name";
import { getPositionByType } from "unwritten:interpreter:ast/shared/position";
import {
  isGetterSymbol,
  isMethodSymbol,
  isPropertySymbol,
  isSetterSymbol
} from "unwritten:interpreter:typeguards/symbols";
import { isThisType } from "unwritten:interpreter:typeguards/types";
import { withCachedType, withLockedType } from "unwritten:interpreter:utils/ts";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { isSymbolExcluded } from "unwritten:utils/exclude";

import type { ObjectType as TSObjectType } from "typescript";
import type { InferObjectLikeType, ObjectLikeTypeKind } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createObjectLikeType = <SpecificObjectLikeTypeKind extends ObjectLikeTypeKind>(ctx: InterpreterContext, type: TSObjectType, kind: SpecificObjectLikeTypeKind = TypeKind.Object as SpecificObjectLikeTypeKind): InferObjectLikeType<SpecificObjectLikeTypeKind> => withCachedType(ctx, type, () => withLockedType(ctx, type, () => {

  const tsConstructSignatures = type.getConstructSignatures();
  const tsCallSignatures = type.getCallSignatures();
  const tsProperties = type.getProperties();

  const getterProperties = tsProperties.filter(property => isGetterSymbol(ctx, property))
    .filter(getter => !isSymbolExcluded(ctx, getter));

  const setterProperties = tsProperties.filter(property => isSetterSymbol(ctx, property))
    .filter(setter => !isSymbolExcluded(ctx, setter));

  const propertyProperties = tsProperties.filter(property => isPropertySymbol(ctx, property))
    .filter(property => !isSymbolExcluded(ctx, property));

  const methodProperties = tsProperties.filter(property => isMethodSymbol(ctx, property))
    .filter(method => !isSymbolExcluded(ctx, method));

  const constructSignatures = tsConstructSignatures.map(signature => createSignatureEntity(ctx, signature, EntityKind.ConstructSignature));
  const callSignatures = tsCallSignatures.map(signature => createSignatureEntity(ctx, signature, EntityKind.CallSignature));

  const methods = methodProperties.map(property => createMethodEntity(ctx, property));
  const getters = getterProperties.map(property => createGetterEntity(ctx, property));
  const setters = setterProperties.map(property => createSetterEntity(ctx, property));
  const allProperties = propertyProperties.map(property => createPropertyEntity(ctx, property));
  const properties = allProperties.filter(property => property.eventProperty === undefined);
  const events = allProperties.filter(property => property.eventProperty === true);

  const name = getNameByType(ctx, type);
  const symbolId = getSymbolId(ctx, type.symbol);
  const typeId = getTypeId(ctx, type);
  const position = getPositionByType(ctx, type);
  const isThis = isThisType(ctx, type);

  return <InferObjectLikeType<typeof kind>>{
    callSignatures,
    constructSignatures,
    events,
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

}));
