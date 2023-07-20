import { createCircularEntity, createUnresolvedEntity } from "unwritten:interpreter/ast/entities/index.js";
import { getPositionBySymbol } from "unwritten:interpreter/ast/shared/position.js";
import { isSymbolLocked } from "unwritten:interpreter/utils/locker.js";
import { isTypeLocked, resolveSymbolInCaseOfImport } from "unwritten:interpreter/utils/ts.js";
import {
  createClassEntity,
  createEnumEntity,
  createExportAssignmentEntity,
  createFunctionEntity,
  createInterfaceEntity,
  createModuleEntity,
  createNamespaceEntity,
  createNamespaceEntityFromNamespaceExport,
  createSourceFileEntity,
  createTypeAliasEntity,
  createTypeParameterEntity,
  createVariableEntity
} from "unwritten:interpreter:ast/entities/index.js";
import { getNameBySymbol, getNameByType } from "unwritten:interpreter:ast/shared/name.js";
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
} from "unwritten:interpreter:ast/types/index.js";
import {
  isClassSymbol,
  isEnumSymbol,
  isExportAssignmentSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isModuleSymbol,
  isNamespaceExportSymbol,
  isNamespaceSymbol,
  isSourceFileSymbol,
  isTypeAliasSymbol,
  isTypeParameterSymbol,
  isVariableSymbol
} from "unwritten:interpreter:typeguards/symbols.js";
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
} from "unwritten:interpreter:typeguards/type-nodes.js";
import {
  isAnyType,
  isArrayType,
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
} from "unwritten:interpreter:typeguards/types.js";
import { isTypeReferenceType } from "unwritten:typeguards/types.js";
import { isSymbolExcluded } from "unwritten:utils/exclude.js";
import { assert } from "unwritten:utils:general.js";

import type { Declaration, ObjectType as TSObjectType, Symbol, Type as TSType, TypeNode } from "typescript";

import type { Entity, SourceFileEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { Type } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function interpret(ctx: InterpreterContext, sourceFileSymbols: Symbol[]): SourceFileEntity[] {
  return sourceFileSymbols.map(sourceFileSymbol => {
    assert(isSourceFileSymbol(ctx, sourceFileSymbol), "Source file symbol is not a source file symbol");
    return createSourceFileEntity(ctx, sourceFileSymbol);
  });
}


export function interpretSymbol(ctx: InterpreterContext, symbol: Symbol): Entity {

  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

  if(isSymbolExcluded(ctx, resolvedSymbol)){
    return createUnresolvedEntity(ctx, resolvedSymbol);
  }

  if(isSymbolLocked(ctx, resolvedSymbol)){
    return createCircularEntity(ctx, resolvedSymbol);
  }

  if(isVariableSymbol(ctx, resolvedSymbol)){
    return createVariableEntity(ctx, resolvedSymbol);
  } else if(isFunctionSymbol(ctx, resolvedSymbol)){
    return createFunctionEntity(ctx, resolvedSymbol);
  } else if(isClassSymbol(ctx, resolvedSymbol)){
    return createClassEntity(ctx, resolvedSymbol);
  } else if(isInterfaceSymbol(ctx, resolvedSymbol)){
    return createInterfaceEntity(ctx, resolvedSymbol);
  } else if(isTypeAliasSymbol(ctx, resolvedSymbol)){
    return createTypeAliasEntity(ctx, resolvedSymbol);
  } else if(isEnumSymbol(ctx, resolvedSymbol)){
    return createEnumEntity(ctx, resolvedSymbol);
  } else if(isNamespaceSymbol(ctx, resolvedSymbol)){
    return createNamespaceEntity(ctx, resolvedSymbol);
  } else if(isNamespaceExportSymbol(ctx, resolvedSymbol)){
    return createNamespaceEntityFromNamespaceExport(ctx, resolvedSymbol);
  } else if(isModuleSymbol(ctx, resolvedSymbol)){
    return createModuleEntity(ctx, resolvedSymbol);
  } else if(isExportAssignmentSymbol(ctx, resolvedSymbol)){
    return createExportAssignmentEntity(ctx, resolvedSymbol);
  } else if(isTypeParameterSymbol(ctx, resolvedSymbol)){
    return createTypeParameterEntity(ctx, resolvedSymbol);
  }

  const name = getNameBySymbol(ctx, resolvedSymbol);
  const formattedName = name ? `"${name}"` : "";
  const position = getPositionBySymbol(ctx, resolvedSymbol);
  const formattedPosition = position ? `at ${position.file}:${position.line}:${position.column}` : "";

  throw new RangeError(`Symbol ${formattedName} ${formattedPosition} is not exportable`);

}

export function getResolvedTypeBySymbol(ctx: InterpreterContext, symbol: Symbol, declaration?: Declaration): Type {
  const type = declaration
    ? ctx.checker.getTypeOfSymbolAtLocation(symbol, declaration)
    : ctx.checker.getTypeOfSymbol(symbol);

  return getResolvedTypeByType(ctx, type);
}

export function getResolvedTypeByType(ctx: InterpreterContext, type: TSType): Type {
  return interpretType(ctx, type);
}

export function getResolvedTypeByTypeNode(ctx: InterpreterContext, typeNode: TypeNode): Type {
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return getResolvedTypeByType(ctx, type);
}

export function getDeclaredType(ctx: InterpreterContext, typeNode: TypeNode): Type {
  return interpretTypeNode(ctx, typeNode);
}

export function getTypeByDeclaredOrResolvedType(declaredType: Type, resolvedType: Type): Type {

  if(!isTypeReferenceType(declaredType)){
    return declaredType;
  }

  if(!declaredType.type){
    return declaredType;
  }

  if(isTypeReferenceType(declaredType.type)){
    return getTypeByDeclaredOrResolvedType(declaredType.type, resolvedType);
  }

  if(declaredType.type.typeId === resolvedType.typeId){
    return declaredType;
  }

  return resolvedType;

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
  } else if(isIndexedAccessTypeNode(ctx, typeNode)){
    return createIndexedAccessTypeByTypeNode(ctx, typeNode);
  } else if(isUnionTypeNode(ctx, typeNode)){
    return createUnionTypeByTypeNode(ctx, typeNode);
  }

  if(isTypeReferenceNode(ctx, typeNode)){
    return createTypeReferenceType(ctx, typeNode);
  } else if(isExpressionWithTypeArguments(ctx, typeNode)){
    return createExpressionType(ctx, typeNode);
  }

  return getResolvedTypeByTypeNode(ctx, typeNode);

}

function interpretType(ctx: InterpreterContext, type: TSType): Type {

  if(isArrayType(ctx, type)){
    return createArrayType(ctx, type);
  }

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
  }

  return createUnresolvedType(ctx, type);

}

function interpretObjectType(ctx: InterpreterContext, type: TSObjectType) {

  if(isTupleTypeReferenceType(ctx, type)){
    return createTupleTypeByTypeReference(ctx, type);
  } else if(isArrayType(ctx, type)){
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
