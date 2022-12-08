import { Declaration, ObjectFlags, ObjectType as TSObjectType, Symbol, Type } from "typescript";

import { error } from "../../logger/index.js";
import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { isSymbolExcluded } from "../../utils/exclude.js";
import { assert } from "../../utils/general.js";
import { getNameBySymbol } from "../compositions/name.js";
import { createArrayByTypeReference } from "../entities/array.js";
import { createClassByType } from "../entities/class.js";
import { createConditionalType } from "../entities/conditional-type.js";
import { createFunctionByType } from "../entities/function.js";
import { createInterfaceByType } from "../entities/interface.js";
import { createIntersectionTypeByType } from "../entities/intersection-type.js";
import { createLiteralType } from "../entities/literal-type.js";
import { createMappedTypeByType } from "../entities/mapped-type.js";
import { createObjectLiteralByType } from "../entities/object-literal.js";
import { createPrimitiveType } from "../entities/primitive.js";
import { createThisByType } from "../entities/this-type.js";
import { createTupleTypeByTypeReference } from "../entities/tuple-type.js";
import { createTypeLiteralByType } from "../entities/type-literal.js";
import { createTypeParameterByType } from "../entities/type-parameter.js";
import { createUnionTypeByType } from "../entities/union-type.js";
import { createUnresolvedBySymbol, createUnresolvedByType } from "../entities/unresolved.js";
import {
  isArrayTypeReferenceType,
  isClassType,
  isConditionalType,
  isFunctionLikeType,
  isInterfaceType,
  isIntersectionType,
  isLiteralType,
  isMappedType,
  isObjectLiteralType,
  isObjectType,
  isPrimitiveType,
  isThisType,
  isTupleTypeReferenceType,
  isTypeLiteralType,
  isTypeParameterType,
  isTypeReferenceType,
  isUnionType
} from "../typeguards/types.js";

/** Getting the type by symbol (using getTypeOfSymbolAtLocation()) resolves generics */
export function createTypeBySymbol(ctx: CompilerContext, symbol: Symbol): Types {

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration, `Symbol ${getNameBySymbol(ctx, symbol)} has no declaration`);

  const type = ctx.checker.getTypeOfSymbolAtLocation(symbol, declaration);
  return parseType(ctx, type);

}

export function createTypeByDeclaration(ctx: CompilerContext, declaration: Declaration): Types {
  const type = ctx.checker.getTypeAtLocation(declaration);
  return parseType(ctx, type);
}


export function parseType(ctx: CompilerContext, type: Type): Types {


  if(isObjectType(type)){
    return parseObjectType(ctx, type);
  }


  //-- Order is important! Sort by most specific to least specific

  if(isThisType(type)){
    return createThisByType(ctx, type);
  } else if(isConditionalType(type)){
    return createConditionalType(ctx, type);
  } else if(isLiteralType(type)){
    return createLiteralType(ctx, type);
  } else if(isPrimitiveType(type)){
    return createPrimitiveType(ctx, type);
  } else if(isUnionType(type)){
    return createUnionTypeByType(ctx, type);
  } else if(isIntersectionType(type)){
    return createIntersectionTypeByType(ctx, type);
  } else if(isTypeParameterType(type)){
    return createTypeParameterByType(ctx, type);
  } else {
    return createUnresolvedByType(ctx, type);
  }

}


export function parseObjectType(ctx: CompilerContext, type: TSObjectType): Types {

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  } else if(isArrayTypeReferenceType(type)){
    return createArrayByTypeReference(ctx, type);
  }

  const symbol = type.symbol;

  if(isSymbolExcluded(ctx, symbol)){
    return createUnresolvedBySymbol(ctx, symbol);
  }

  if(isMappedType(type)){
    return createMappedTypeByType(ctx, type);
  } else if(isFunctionLikeType(type)){
    return createFunctionByType(ctx, type);
  } else if(isTypeLiteralType(type)){
    return createTypeLiteralByType(ctx, type);
  } else if(isObjectLiteralType(type)){
    return createObjectLiteralByType(ctx, type);
  } else if(isInterfaceType(type)){
    return createInterfaceByType(ctx, type);
  } else if(isClassType(type)){
    return createClassByType(ctx, type);
  } else if(isTypeReferenceType(type)){
    // return createTypeReferenceByType(ctx, type);
  }

  const objectFlags = getEnumFlagNames(ObjectFlags, type.objectFlags);

  console.log(objectFlags);

  const name = getNameBySymbol(ctx, symbol);

  if(!name.startsWith("__")){
    // return parseSymbol(ctx, symbol);
  }

  throw error("Unknown object type");

}


function getEnumFlagNames(enumObj: any, flags: number) {
  const allFlags = Object.keys(enumObj)
    .map(k => enumObj[k])
    .filter(v => typeof v === "number") as number[];
  const matchedFlags = allFlags.filter(f => (f & flags) !== 0);

  return matchedFlags
    .filter((f, i) => matchedFlags.indexOf(f) === i)
    .map(f => {
      const power = Math.log2(f);
      if(Number.isInteger(power)){
        return `${enumObj[f]} (2 ^ ${power})`;
      }
      return enumObj[f];
    });
}
