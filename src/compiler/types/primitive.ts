import { Type } from "typescript";

import {
  isAnyType,
  isBigIntType,
  isBooleanType,
  isNeverType,
  isNullType,
  isNumberType,
  isStringType,
  isUndefinedType,
  isVoidType
} from "../../typeguards/ts.js";
import { EntityKind, PrimitiveTypeKinds, PrimitiveTypes } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";


export function createPrimitiveType(type: Type): PrimitiveTypes {

  const kind = getPrimitiveTypeKind(type);
  const id = getIdByType(type);

  return {
    kind,
    id
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
  } else if(isNeverType(type)){
    return EntityKind.Never;
  } else if(isAnyType(type)){
    return EntityKind.Any;
  }

  throw new Error("type is not a primitive type");

}