import {
  BigIntLiteralType as TSBigIntLiteralType,
  LiteralType,
  NumberLiteralType as TSNumberLiteralType,
  StringLiteralType as TSStringLiteralType
} from "typescript";

import {
  isBigIntLiteralType,
  isBooleanLiteralType,
  isNumberLiteralType,
  isStringLiteralType
} from "../../typeguards/ts.js";
import {
  BigIntLiteralType,
  BooleanLiteralType,
  LiteralTypes,
  NumberLiteralType,
  StringLiteralType,
  TypeKind
} from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";


export function createLiteralType(type: LiteralType): LiteralTypes {

  if(isStringLiteralType(type)){
    return _createStringLiteralType(type);
  } else if(isNumberLiteralType(type)){
    return _createNumberLiteralType(type);
  } else if(isBooleanLiteralType(type)){
    return _createBooleanLiteralType(type);
  } else if(isBigIntLiteralType(type)){
    return _createBigIntLiteralType(type);
  }

  throw new Error("type is not a literal type");

}


function _createStringLiteralType(type: TSStringLiteralType): StringLiteralType {

  const id = getIdByType(type);
  const value = type.value;
  const kind = TypeKind.StringLiteral;

  return {
    id,
    kind,
    value
  };

}


function _createNumberLiteralType(type: TSNumberLiteralType): NumberLiteralType {

  const id = getIdByType(type);
  const value = type.value;
  const kind = TypeKind.NumberLiteral;

  return {
    id,
    kind,
    value
  };

}


function _createBooleanLiteralType(type: LiteralType): BooleanLiteralType {

  const id = getIdByType(type);
  // @ts-expect-error // Alternative way would be to use the typeChecker and typeToString()
  const value = type.intrinsicName === "true";
  const kind = TypeKind.BooleanLiteral;

  return {
    id,
    kind,
    value
  };

}


function _createBigIntLiteralType(type: TSBigIntLiteralType): BigIntLiteralType {

  const id = getIdByType(type);
  const sign = type.value.negative ? "-" : "";
  const value = BigInt(sign + type.value.base10Value);
  const kind = TypeKind.BigIntLiteral;

  return {
    id,
    kind,
    value
  };

}