import { Type } from "typescript";
import {
  isBigIntType,
  isBooleanType,
  isNullType,
  isNumberType,
  isStringType,
  isUndefinedType,
  isVoidType
} from "../../typeguards/ts.js";
import { EntityKind, PrimitiveTypeKinds, PrimitiveTypes } from "../../types/types.js";

import { getIdByType } from "../compositions/id.js";
import { getNameByType } from "../compositions/name.js";


export function createPrimitiveType(type: Type): PrimitiveTypes {

  const kind = getPrimitiveTypeKind(type);
  const id = getIdByType(type);
  const name = getNameByType(type);

  return {
    kind,
    id,
    name
  };

}


function getPrimitiveTypeKind(type: Type): PrimitiveTypeKinds {

  if(isStringType(type)){
    return EntityKind.String;
  } else if(isNumberType(type)){
    return EntityKind.Number;
  } else if(isBooleanType(type)){
    return EntityKind.Boolean;
  } else if(isBigIntType(type)){
    return EntityKind.BigInt;
  } else if(isVoidType(type)){
    return EntityKind.Void;
  } else if(isUndefinedType(type)){
    return EntityKind.Undefined;
  } else if(isNullType(type)){
    return EntityKind.Null;
  }

  throw new Error("type is not a primitive type");

}