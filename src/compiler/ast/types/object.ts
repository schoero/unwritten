import {
  createGetterEntity,
  createMethodEntity,
  createPropertyEntity,
  createSetterEntity,
  createSignatureEntity
} from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { getPositionByType } from "quickdoks:compiler:mixins/position.js";
import {
  isGetterSymbol,
  isMethodSymbol,
  isPropertySymbol,
  isSetterSymbol
} from "quickdoks:compiler:typeguards/symbols.js";
import { isThisType } from "quickdoks:compiler:typeguards/types.js";
import { lockType } from "quickdoks:compiler:utils/ts.js";

import type { ObjectType as TSObjectType } from "typescript";

import type { InferObjectLikeType, ObjectLikeTypeKinds } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.js";


export const createObjectLikeType = <ObjectLikeTypeKind extends ObjectLikeTypeKinds>(ctx: CompilerContext, type: TSObjectType, kind: ObjectLikeTypeKind = TypeKind.Object as ObjectLikeTypeKind): InferObjectLikeType<ObjectLikeTypeKind> => lockType(ctx, type, () => {

  const tsConstructSignatures = type.getConstructSignatures();
  const tsCallSignatures = type.getCallSignatures();
  const tsProperties = type.getProperties();


  //-- Object type

  const getterProperties = tsProperties.filter(isGetterSymbol);
  const setterProperties = tsProperties.filter(isSetterSymbol);
  const propertyProperties = tsProperties.filter(isPropertySymbol);
  const methodProperties = tsProperties.filter(isMethodSymbol);

  const constructSignatures = tsConstructSignatures.map(signature => createSignatureEntity(ctx, signature));
  const callSignatures = tsCallSignatures.map(signature => createSignatureEntity(ctx, signature));

  const methods = methodProperties.map(property => createMethodEntity(ctx, property));
  const getters = getterProperties.map(property => createGetterEntity(ctx, property));
  const setters = setterProperties.map(property => createSetterEntity(ctx, property));
  const properties = propertyProperties.map(property => createPropertyEntity(ctx, property));

  const id = getIdByType(ctx, type);
  const position = getPositionByType(ctx, type);
  const isThis = isThisType(type);

  return <InferObjectLikeType<typeof kind>>{
    callSignatures,
    constructSignatures,
    getters,
    id,
    isThis,
    kind,
    methods,
    position,
    properties,
    setters
  };

});
