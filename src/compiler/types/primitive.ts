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
import { CompilerContext } from "../../types/context.js";
import { PrimitiveTypeKinds, PrimitiveTypes, TypeKind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";


export function createPrimitiveType(ctx: CompilerContext, type: Type): PrimitiveTypes {

  const kind = getPrimitiveTypeKind(ctx, type);
  const id = getIdByType(ctx, type);

  return {
    id,
    kind
  };

}


function getPrimitiveTypeKind(ctx: CompilerContext, type: Type): PrimitiveTypeKinds {

  if(isStringType(type)){
    return TypeKind.String;
  } else if(isNumberType(type)){
    return TypeKind.Number;
  } else if(isBooleanType(type)){
    return TypeKind.Boolean;
  } else if(isBigIntType(type)){
    return TypeKind.BigInt;
  } else if(isVoidType(type)){
    return TypeKind.Void;
  } else if(isUndefinedType(type)){
    return TypeKind.Undefined;
  } else if(isNullType(type)){
    return TypeKind.Null;
  } else if(isNeverType(type)){
    return TypeKind.Never;
  } else if(isAnyType(type)){
    return TypeKind.Any;
  }

  throw new Error("type is not a primitive type");

}