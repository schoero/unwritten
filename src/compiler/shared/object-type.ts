import { ObjectType as TSObjectType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { createGetterBySymbol } from "quickdoks:compiler:entities/getter.js";
import { createMethodBySymbol } from "quickdoks:compiler:entities/method.js";
import { createPropertyBySymbol } from "quickdoks:compiler:entities/property.js";
import { createSetterBySymbol } from "quickdoks:compiler:entities/setter.js";
import { createSignatureBySignature } from "quickdoks:compiler:entities/signature.js";
import {
  isGetterSymbol,
  isMethodSymbol,
  isPropertySymbol,
  isSetterSymbol
} from "quickdoks:compiler:typeguards/symbols.js";
import { CompilerContext } from "quickdoks:types:context.js";


export function createObjectTypeByType(ctx: CompilerContext, type: TSObjectType) {

  const tsConstructSignatures = type.getConstructSignatures();
  const tsCallSignatures = type.getCallSignatures();
  const allProperties = type.getProperties();


  //-- Object type

  const id = getIdByType(ctx, type);

  const getterProperties = allProperties.filter(p => isGetterSymbol(p));
  const setterProperties = allProperties.filter(p => isSetterSymbol(p));
  const propertyProperties = allProperties.filter(p => isPropertySymbol(p));
  const methodProperties = allProperties.filter(p => isMethodSymbol(p));

  const constructSignatures = tsConstructSignatures.map(signature => createSignatureBySignature(ctx, signature));
  const callSignatures = tsCallSignatures.map(signature => createSignatureBySignature(ctx, signature));

  const methods = methodProperties.map(property => createMethodBySymbol(ctx, property));
  const getters = getterProperties.map(property => createGetterBySymbol(ctx, property));
  const setters = setterProperties.map(property => createSetterBySymbol(ctx, property));
  const properties = propertyProperties.map(property => createPropertyBySymbol(ctx, property));

  return {
    callSignatures,
    constructSignatures,
    getters,
    id,
    methods,
    properties,
    setters
  };

}
