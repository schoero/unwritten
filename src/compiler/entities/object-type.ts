import { ObjectType as TSObjectType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, Types } from "../../types/types.js";
import { isSymbolExcluded } from "../../utils/general.js";
import { getIdByType } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { parseSymbol } from "../entry-points/symbol.js";
import { isGetterSymbol, isMethodSymbol, isPropertySymbol, isSetterSymbol } from "../typeguards/symbols.js";
import {
  isArrayTypeReferenceType,
  isFunctionLikeType,
  isMappedType,
  isTupleTypeReferenceType,
  isTypeLiteralType
} from "../typeguards/types.js";
import { createArrayByTypeReference } from "./array.js";
import { createFunctionByType } from "./function.js";
import { createGetterBySymbol } from "./getter.js";
import { createMappedTypeByType } from "./mapped-type.js";
import { createMethodBySymbol } from "./method.js";
import { createPropertyBySymbol } from "./property.js";
import { createSetterBySymbol } from "./setter.js";
import { createSignatureBySignature } from "./signature.js";
import { createTupleTypeByTypeReference } from "./tuple-type.js";
import { createTypeLiteralByType } from "./type-literal.js";
import { createUnresolvedBySymbol } from "./unresolved.js";


export function createObjectTypeByType(ctx: CompilerContext, type: TSObjectType): Types {

  const tsConstructSignatures = type.getConstructSignatures();
  const tsCallSignatures = type.getCallSignatures();
  const allProperties = type.getProperties();


  //-- Object type

  const id = getIdByType(ctx, type);
  const kind = Kind.Object;

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
    kind,
    methods,
    properties,
    setters
  };

}


export function parseObjectType(ctx: CompilerContext, type: TSObjectType): Types {


  //-- Array

  if(isArrayTypeReferenceType(type)){
    return createArrayByTypeReference(ctx, type);
  }


  //-- Tuple

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  }


  const symbol = type.symbol;


  //-- Unresolved

  if(isSymbolExcluded(ctx, symbol)){
    return createUnresolvedBySymbol(ctx, symbol);
  }

  const name = getNameBySymbol(ctx, symbol);


  //-- Symbol

  if(!name.startsWith("__")){
    return parseSymbol(ctx, symbol);
  }


  //-- Mapped type

  if(isMappedType(type)){
    return createMappedTypeByType(ctx, type);
  }


  //-- Function

  if(isFunctionLikeType(type)){
    return createFunctionByType(ctx, type);
  }


  //-- Type literal

  if(isTypeLiteralType(type)){
    return createTypeLiteralByType(ctx, type);
  }

  return createObjectTypeByType(ctx, type);
}
