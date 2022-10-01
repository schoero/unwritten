import { Type } from "typescript";

import {
  isBigIntLiteralType,
  isBooleanLiteralType,
  isNumberLiteralType,
  isStringLiteralType
} from "../../typeguards/ts.js";
import { EntityKind, LiteralTypeKinds, LiteralTypes } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";


export function createLiteralType(type: Type): LiteralTypes {

  const kind = getLiteralTypeKind(type);
  const id = getIdByType(type);
  const value = getValueByType(type);

  return {
    id,
    kind,
    value
  };

}


function getLiteralTypeKind(type: Type): LiteralTypeKinds {

  if(isStringLiteralType(type)){
    return EntityKind.StringLiteral;
  } else if(isNumberLiteralType(type)){
    return EntityKind.NumberLiteral;
  } else if(isBooleanLiteralType(type)){
    return EntityKind.BooleanLiteral;
  } else if(isBigIntLiteralType(type)){
    return EntityKind.BigIntLiteral;
  }

  throw new Error("type is not a literal type");

}


function getValueByType(type: Type): BigInt | boolean | number | string {

  if(isStringLiteralType(type)){
    return type.value;
  } else if(isNumberLiteralType(type)){
    return type.value;
  } else if(isBooleanLiteralType(type)){
    // @ts-expect-error // Alternative way would be to use the typeChecker and typeToString()
    return type.intrinsicName === "true";
  } else if(isBigIntLiteralType(type)){
    const sign = type.value.negative ? "-" : "";
    return BigInt(sign + type.value.base10Value);
  }

  throw new Error("type is not a literal type");

}
