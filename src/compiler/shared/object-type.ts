import { ObjectType as TSObjectType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { getIdByType } from "../compositions/id.js";
import { createGetterBySymbol } from "../entities/getter.js";
import { createMethodBySymbol } from "../entities/method.js";
import { createPropertyBySymbol } from "../entities/property.js";
import { createSetterBySymbol } from "../entities/setter.js";
import { createSignatureBySignature } from "../entities/signature.js";
import { isGetterSymbol, isMethodSymbol, isPropertySymbol, isSetterSymbol } from "../typeguards/symbols.js";


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
