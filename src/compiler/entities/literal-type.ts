import {
  BigIntLiteralType as TSBigIntLiteralType,
  LiteralType,
  NumberLiteralType as TSNumberLiteralType,
  StringLiteralType as TSStringLiteralType
} from "typescript";

import { CompilerContext } from "../../types/context.js";
import {
  BigIntLiteralType,
  BooleanLiteralType,
  LiteralTypes,
  NumberLiteralType,
  StringLiteralType,
  Kind
} from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import {
  isBigIntLiteralType,
  isBooleanLiteralType,
  isNumberLiteralType,
  isStringLiteralType
} from "../typeguards/types.js";


export function createLiteralType(ctx: CompilerContext, type: LiteralType): LiteralTypes {

  if(isStringLiteralType(type)){
    return _createStringLiteralType(ctx, type);
  } else if(isNumberLiteralType(type)){
    return _createNumberLiteralType(ctx, type);
  } else if(isBooleanLiteralType(type)){
    return _createBooleanLiteralType(ctx, type);
  } else if(isBigIntLiteralType(type)){
    return _createBigIntLiteralType(ctx, type);
  }

  throw new Error("type is not a literal type");

}


function _createStringLiteralType(ctx: CompilerContext, type: TSStringLiteralType): StringLiteralType {

  const id = getIdByType(ctx, type);
  const value = type.value;
  const kind = Kind.StringLiteral;

  return {
    id,
    kind,
    value
  };

}


function _createNumberLiteralType(ctx: CompilerContext, type: TSNumberLiteralType): NumberLiteralType {

  const id = getIdByType(ctx, type);
  const value = type.value;
  const kind = Kind.NumberLiteral;

  return {
    id,
    kind,
    value
  };

}


function _createBooleanLiteralType(ctx: CompilerContext, type: LiteralType): BooleanLiteralType {

  const id = getIdByType(ctx, type);
  // @ts-expect-error // Alternative way would be to use the typeChecker and typeToString()
  const value = type.intrinsicName === "true";
  const kind = Kind.BooleanLiteral;

  return {
    id,
    kind,
    value
  };

}


function _createBigIntLiteralType(ctx: CompilerContext, type: TSBigIntLiteralType): BigIntLiteralType {

  const id = getIdByType(ctx, type);
  const sign = type.value.negative ? "-" : "";
  const value = BigInt(sign + type.value.base10Value);
  const kind = Kind.BigIntLiteral;

  return {
    id,
    kind,
    value
  };

}
