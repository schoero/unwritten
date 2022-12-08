import { Type } from "typescript";

import { error } from "../../logger/index.js";
import { CompilerContext } from "../../types/context.js";
import { Kind, PrimitiveTypeKinds, PrimitiveTypes } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import {
  isAnyType,
  isBigIntType,
  isBooleanType,
  isNeverType,
  isNullType,
  isNumberType,
  isStringType,
  isUndefinedType,
  isUnknownType,
  isVoidType
} from "../typeguards/types.js";


export function createPrimitiveType(ctx: CompilerContext, type: Type): PrimitiveTypes {

  const kind = _getPrimitiveTypeKind(ctx, type);
  const name = _getIntrinsicName(ctx, type);
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}


function _getPrimitiveTypeKind(ctx: CompilerContext, type: Type): PrimitiveTypeKinds {

  if(isStringType(type)){
    return Kind.String;
  } else if(isNumberType(type)){
    return Kind.Number;
  } else if(isBooleanType(type)){
    return Kind.Boolean;
  } else if(isBigIntType(type)){
    return Kind.BigInt;
  } else if(isVoidType(type)){
    return Kind.Void;
  } else if(isUndefinedType(type)){
    return Kind.Undefined;
  } else if(isNullType(type)){
    return Kind.Null;
  } else if(isNeverType(type)){
    return Kind.Never;
  } else if(isAnyType(type)){
    return Kind.Any;
  } else if(isUnknownType(type)){
    return Kind.Unknown;
  }

  throw error("type is not a primitive type");

}


function _getIntrinsicName(ctx: CompilerContext, type: Type): string | undefined {

  if(isStringType(type)){
    return "string";
  } else if(isNumberType(type)){
    return "number";
  } else if(isBooleanType(type)){
    return "boolean";
  } else if(isBigIntType(type)){
    return "bigint";
  } else if(isVoidType(type)){
    return "void";
  } else if(isUndefinedType(type)){
    return "undefined";
  } else if(isNullType(type)){
    return "null";
  } else if(isNeverType(type)){
    return "never";
  } else if(isAnyType(type)){
    return "any";
  }

}
