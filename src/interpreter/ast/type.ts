import { isSymbolLocked, isTypeLocked } from "unwritten:interpreter/utils/ts";
import { getNameByType } from "unwritten:interpreter:ast/shared/name";
import {
  createAnyType,
  createArrayType,
  createArrayTypeByArrayTypeNode,
  createBigIntLiteralType,
  createBigIntType,
  createBooleanLiteralType,
  createBooleanType,
  createCircularType,
  createClassType,
  createConditionalType,
  createConditionalTypeByTypeNode,
  createExpressionType,
  createFunctionType,
  createIndexedAccessType,
  createIndexedAccessTypeByTypeNode,
  createInterfaceByType,
  createIntersectionType,
  createMappedTypeByTypeNode,
  createNeverType,
  createNullType,
  createNumberLiteralType,
  createNumberType,
  createObjectLikeType,
  createObjectLiteralByType,
  createStringLiteralType,
  createStringType,
  createSymbolType,
  createTemplateLiteralType,
  createTupleByTupleTypeNode,
  createTupleTypeByTypeReference,
  createTypeLiteralType,
  createTypeParameterType,
  createTypeQueryType,
  createTypeReferenceType,
  createUndefinedType,
  createUnionType,
  createUnionTypeByTypeNode,
  createUnknownType,
  createUnresolved,
  createUnresolvedType,
  createVoidType
} from "unwritten:interpreter:ast/types/index";
import {
  isArrayTypeNode,
  isConditionalTypeNode,
  isExpressionWithTypeArguments,
  isIndexedAccessTypeNode,
  isMappedTypeNode,
  isTemplateLiteralTypeNode,
  isTupleTypeNode,
  isTypeQueryNode,
  isTypeReferenceNode,
  isUnionTypeNode
} from "unwritten:interpreter:typeguards/type-nodes";
import {
  isAnyType,
  isArrayTypeReferenceType,
  isBigIntLiteralType,
  isBigIntType,
  isBooleanLiteralType,
  isBooleanType,
  isClassType,
  isConditionalType,
  isFunctionLikeType,
  isIndexedAccessType,
  isInterfaceType,
  isIntersectionType,
  isNeverType,
  isNullType,
  isNumberLiteralType,
  isNumberType,
  isObjectLiteralType,
  isObjectType,
  isStringLiteralType,
  isStringType,
  isSymbolType,
  isTupleTypeReferenceType,
  isTypeLiteralType,
  isTypeParameterType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "unwritten:interpreter:typeguards/types";
import { isTypeReferenceType } from "unwritten:typeguards/types";
import { isSymbolExcluded } from "unwritten:utils/exclude";

import type { Declaration, ObjectType as TSObjectType, Symbol, Type as TSType, TypeNode } from "typescript";

import type {
  DeclaredType,
  ResolvedType,
  Type,
  TypeReferenceType
} from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


function getTypeNodeByDeclaration(ctx: InterpreterContext, declaration: Declaration): TypeNode | undefined {
  if("type" in declaration && declaration.type){
    return declaration.type as TypeNode;
  }
}


export function getResolvedTypeByDeclaration(ctx: InterpreterContext, declaration: Declaration): ResolvedType {
  return {
    ...interpretType(ctx, ctx.checker.getTypeAtLocation(declaration)),
    brand: "resolved"
  };
}

export function getResolvedTypeBySymbol(ctx: InterpreterContext, symbol: Symbol, declaration?: Declaration): ResolvedType {
  return {
    ...declaration
      ? getTypeByType(ctx, ctx.checker.getTypeOfSymbolAtLocation(symbol, declaration))
      : getTypeByType(ctx, ctx.checker.getTypeOfSymbol(symbol)),
    brand: "resolved"
  };

}

export function getResolvedTypeByTypeNode(ctx: InterpreterContext, typeNode: TypeNode): ResolvedType {
  return {
    ...interpretType(ctx, ctx.checker.getTypeFromTypeNode(typeNode)),
    brand: "resolved"
  };
}

export function getResolvedTypeByType(ctx: InterpreterContext, type: TSType): ResolvedType {
  return {
    ...interpretType(ctx, type),
    brand: "resolved"
  };
}

export function getDeclaredTypeByTypeNode(ctx: InterpreterContext, typeNode: TypeNode): DeclaredType {
  return {
    ...interpretTypeNode(ctx, typeNode),
    brand: "declared"
  };
}

export function getTypeByType(ctx: InterpreterContext, type: TSType): Type {
  const resolvedType = getResolvedTypeByType(ctx, type);
  return getTypeByResolvedAndDeclaredType(ctx, resolvedType);
}

export function getTypeByTypeNode(ctx: InterpreterContext, typeNode: TypeNode): Type {
  const declaredType = getDeclaredTypeByTypeNode(ctx, typeNode);
  const resolvedType = getResolvedTypeByTypeNode(ctx, typeNode);
  return getTypeByResolvedAndDeclaredType(ctx, resolvedType, declaredType);
}

export function getTypeBySymbol(ctx: InterpreterContext, symbol: Symbol, declaration?: Declaration): Type {
  const typeNode = declaration && getTypeNodeByDeclaration(ctx, declaration);
  const declaredType = typeNode && getDeclaredTypeByTypeNode(ctx, typeNode);
  const resolvedType = getResolvedTypeBySymbol(ctx, symbol, declaration);
  return getTypeByResolvedAndDeclaredType(ctx, resolvedType, declaredType);
}

export function getTypeByDeclaration(ctx: InterpreterContext, declaration: Declaration): Type {
  const typeNode = getTypeNodeByDeclaration(ctx, declaration);
  const declaredType = typeNode && getDeclaredTypeByTypeNode(ctx, typeNode);
  const resolvedType = getResolvedTypeByDeclaration(ctx, declaration);
  return getTypeByResolvedAndDeclaredType(ctx, resolvedType, declaredType);
}
/**
 * Overrides the type of a type reference with the resolved type.
 * @param ctx The interpreter context
 * @param resolvedType The resolved type
 * @param declaredType The declared type
 * @returns The type to use
 */

export function getTypeByResolvedAndDeclaredType(ctx: InterpreterContext, resolvedType: ResolvedType, declaredType?: DeclaredType): Type {

  const { brand: _resolvedBrand, ...resolvedTypeWithoutBrand } = resolvedType;

  if(!declaredType){
    return resolvedTypeWithoutBrand;
  }

  const { brand: _declaredBrand, ...declaredTypeWithoutBrand } = declaredType;

  if(isTypeReferenceType(declaredType)){
    return <TypeReferenceType>{
      ...declaredTypeWithoutBrand,
      type: resolvedTypeWithoutBrand
    };
  }

  return declaredTypeWithoutBrand;

}
function interpretTypeNode(ctx: InterpreterContext, typeNode: TypeNode): Type {

  if(isArrayTypeNode(ctx, typeNode)){
    return createArrayTypeByArrayTypeNode(ctx, typeNode);
  } else if(isTupleTypeNode(ctx, typeNode)){
    return createTupleByTupleTypeNode(ctx, typeNode);
  } else if(isTypeQueryNode(ctx, typeNode)){
    return createTypeQueryType(ctx, typeNode);
  } else if(isTemplateLiteralTypeNode(ctx, typeNode)){
    return createTemplateLiteralType(ctx, typeNode);
  } else if(isMappedTypeNode(ctx, typeNode)){
    return createMappedTypeByTypeNode(ctx, typeNode);
  } else if(isConditionalTypeNode(ctx, typeNode)){
    return createConditionalTypeByTypeNode(ctx, typeNode);
  } else if(isUnionTypeNode(ctx, typeNode)){
    return createUnionTypeByTypeNode(ctx, typeNode);
  } else if(isIndexedAccessTypeNode(ctx, typeNode)){
    return createIndexedAccessTypeByTypeNode(ctx, typeNode);
  }

  if(isTypeReferenceNode(ctx, typeNode)){
    return createTypeReferenceType(ctx, typeNode);
  } else if(isExpressionWithTypeArguments(ctx, typeNode)){
    return createExpressionType(ctx, typeNode);
  }

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return interpretType(ctx, type);

}
function interpretType(ctx: InterpreterContext, type: TSType): Type {

  if(type.getSymbol() && isSymbolExcluded(ctx, type.symbol, getNameByType(ctx, type))){
    return createUnresolvedType(ctx, type);
  }

  if(isTypeLocked(ctx, type) || type.getSymbol() && isSymbolLocked(ctx, type.symbol)){
    return createCircularType(ctx, type);
  }

  if(isObjectType(ctx, type)){
    return interpretObjectType(ctx, type);
  }

  if(isStringLiteralType(ctx, type)){
    return createStringLiteralType(ctx, type);
  } else if(isNumberLiteralType(ctx, type)){
    return createNumberLiteralType(ctx, type);
  } else if(isBigIntLiteralType(ctx, type)){
    return createBigIntLiteralType(ctx, type);
  } else if(isBooleanLiteralType(ctx, type)){
    return createBooleanLiteralType(ctx, type);
  } else if(isStringType(ctx, type)){
    return createStringType(ctx, type);
  } else if(isNumberType(ctx, type)){
    return createNumberType(ctx, type);
  } else if(isBooleanType(ctx, type)){
    return createBooleanType(ctx, type);
  } else if(isBigIntType(ctx, type)){
    return createBigIntType(ctx, type);
  } else if(isVoidType(ctx, type)){
    return createVoidType(ctx, type);
  } else if(isUndefinedType(ctx, type)){
    return createUndefinedType(ctx, type);
  } else if(isNullType(ctx, type)){
    return createNullType(ctx, type);
  } else if(isAnyType(ctx, type)){
    return createAnyType(ctx, type);
  } else if(isUnknownType(ctx, type)){
    return createUnknownType(ctx, type);
  } else if(isNeverType(ctx, type)){
    return createNeverType(ctx, type);
  } else if(isSymbolType(ctx, type)){
    return createSymbolType(ctx, type);
  } else if(isUnionType(ctx, type)){
    return createUnionType(ctx, type);
  } else if(isIntersectionType(ctx, type)){
    return createIntersectionType(ctx, type);
  } else if(isTypeParameterType(ctx, type)){
    return createTypeParameterType(ctx, type);
  } else if(isIndexedAccessType(ctx, type)){
    return createIndexedAccessType(ctx, type);
  } else if(isConditionalType(ctx, type)){
    return createConditionalType(ctx, type);
  } else if(isArrayTypeReferenceType(ctx, type)){
    return createArrayType(ctx, type);
  }

  return createUnresolvedType(ctx, type);

}
function interpretObjectType(ctx: InterpreterContext, type: TSObjectType) {

  if(isTupleTypeReferenceType(ctx, type)){
    return createTupleTypeByTypeReference(ctx, type);
  } else if(isArrayTypeReferenceType(ctx, type)){
    return createArrayType(ctx, type);
  }

  if(type.getSymbol() && isSymbolExcluded(ctx, type.symbol)){
    return createUnresolved(ctx, type);
  }

  if(isFunctionLikeType(ctx, type)){
    return createFunctionType(ctx, type);
  } else if(isTypeLiteralType(ctx, type)){
    return createTypeLiteralType(ctx, type);
  } else if(isObjectLiteralType(ctx, type)){
    return createObjectLiteralByType(ctx, type);
  } else if(isInterfaceType(ctx, type)){
    return createInterfaceByType(ctx, type);
  } else if(isClassType(ctx, type)){
    return createClassType(ctx, type);
  }

  return createObjectLikeType(ctx, type);

}
