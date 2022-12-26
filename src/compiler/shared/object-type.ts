import { ObjectType as TSObjectType } from "typescript";

import { getIdByType } from "quickdoks:compiler/compositions/id.js";
import { lockType } from "quickdoks:compiler/utils/ts.js";
import {
  createGetterBySymbol,
  createMethodBySymbol,
  createPropertyBySymbol,
  createSetterBySymbol,
  createSignatureBySignature
} from "quickdoks:compiler:entities";
import {
  isGetterSymbol,
  isMethodSymbol,
  isPropertySymbol,
  isSetterSymbol
} from "quickdoks:compiler:typeguards/symbols.js";
import { InferObjectType, Kind, ObjectTypeKinds } from "quickdoks:types/types.js";
import { CompilerContext } from "quickdoks:types:context.js";


export const createObjectTypeByType = <ObjectKind extends ObjectTypeKinds>(ctx: CompilerContext, type: TSObjectType, kind: ObjectKind = Kind.ObjectType as ObjectKind): InferObjectType<ObjectKind> => lockType(ctx, type, () => {

  const tsConstructSignatures = type.getConstructSignatures();
  const tsCallSignatures = type.getCallSignatures();
  const tsProperties = type.getProperties();


  //-- Object type

  const getterProperties = tsProperties.filter(isGetterSymbol);
  const setterProperties = tsProperties.filter(isSetterSymbol);
  const propertyProperties = tsProperties.filter(isPropertySymbol);
  const methodProperties = tsProperties.filter(isMethodSymbol);

  const constructSignatures = tsConstructSignatures.map(signature => createSignatureBySignature(ctx, signature));
  const callSignatures = tsCallSignatures.map(signature => createSignatureBySignature(ctx, signature));

  const methods = methodProperties.map(property => createMethodBySymbol(ctx, property));
  const getters = getterProperties.map(property => createGetterBySymbol(ctx, property));
  const setters = setterProperties.map(property => createSetterBySymbol(ctx, property));
  const properties = propertyProperties.map(property => createPropertyBySymbol(ctx, property));

  const id = getIdByType(ctx, type);

  return <InferObjectType<typeof kind>>{
    callSignatures,
    constructSignatures,
    getters,
    id,
    kind,
    methods,
    properties,
    setters
  };

});
