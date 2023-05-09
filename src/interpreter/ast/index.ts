import {
  createClassEntity,
  createEnumEntity,
  createFunctionEntity,
  createInterfaceEntity,
  createModuleEntity,
  createNamespaceEntity,
  createSourceFileEntity,
  createTypeAliasEntity,
  createVariableEntity
} from "unwritten:interpreter:ast/entities/index.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import {
  createAnyType,
  createArrayTypeByArrayTypeNode,
  createBigIntLiteralType,
  createBigIntType,
  createBooleanLiteralType,
  createBooleanType,
  createClassType,
  createConditionalType,
  createConditionalTypeByTypeNode,
  createExpressionType,
  createFunctionType,
  createIndexedAccessType,
  createIndexedAccessTypeByTypeNode,
  createInterfaceByType,
  createIntersectionType,
  createLinkToType,
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
  createUnknownType,
  createUnresolved,
  createVoidType
} from "unwritten:interpreter:ast/types/index.js";
import {
  isClassSymbol,
  isEnumSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isModuleSymbol,
  isNamespaceSymbol,
  isSourceFileSymbol,
  isTypeAliasSymbol,
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
  isTypeReferenceNode
} from "unwritten:interpreter:typeguards/type-nodes.js";
import {
  isAnyType,
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
import { isTypeLocked, resolveSymbolInCaseOfImport } from "unwritten:interpreter:utils/ts.js";
import { assert } from "unwritten:utils:general.js";

import type { Declaration, ObjectType as TSObjectType, Symbol, Type, TypeNode } from "typescript";

import type { ExportableEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { Types } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function interpret(ctx: InterpreterContext, sourceFileSymbol: Symbol): ExportableEntities[] {
  assert(isSourceFileSymbol(sourceFileSymbol), "Source file symbol is not a source file symbol");
  return createSourceFileEntity(ctx, sourceFileSymbol).exports;
}


export function interpretSymbol(ctx: InterpreterContext, symbol: Symbol): ExportableEntities {

  const resolvedSymbol = resolveSymbolInCaseOfImport(ctx, symbol);

  if(isVariableSymbol(resolvedSymbol)){
    return createVariableEntity(ctx, resolvedSymbol);
  } else if(isFunctionSymbol(resolvedSymbol)){
    return createFunctionEntity(ctx, resolvedSymbol);
  } else if(isClassSymbol(resolvedSymbol)){
    return createClassEntity(ctx, resolvedSymbol);
  } else if(isInterfaceSymbol(resolvedSymbol)){
    return createInterfaceEntity(ctx, resolvedSymbol);
  } else if(isTypeAliasSymbol(resolvedSymbol)){
    return createTypeAliasEntity(ctx, resolvedSymbol);
  } else if(isEnumSymbol(resolvedSymbol)){
    return createEnumEntity(ctx, resolvedSymbol);
  } else if(isNamespaceSymbol(symbol)){
    return createNamespaceEntity(ctx, resolvedSymbol);
  } else if(isModuleSymbol(symbol)){
    return createModuleEntity(ctx, resolvedSymbol);
  } else {
    throw new Error(`Symbol ${getNameBySymbol(ctx, resolvedSymbol)} is not exportable`);
  }

}


export function interpretTypeNode(ctx: InterpreterContext, typeNode: TypeNode): Types {

  if(isArrayTypeNode(typeNode)){
    return createArrayTypeByArrayTypeNode(ctx, typeNode);
  } else if(isTupleTypeNode(typeNode)){
    return createTupleByTupleTypeNode(ctx, typeNode);
  } else if(isTypeQueryNode(typeNode)){
    return createTypeQueryType(ctx, typeNode);
  } else if(isTemplateLiteralTypeNode(typeNode)){
    return createTemplateLiteralType(ctx, typeNode);
  } else if(isMappedTypeNode(typeNode)){
    return createMappedTypeByTypeNode(ctx, typeNode);
  } else if(isConditionalTypeNode(typeNode)){
    return createConditionalTypeByTypeNode(ctx, typeNode);
  } else if(isIndexedAccessTypeNode(typeNode)){
    return createIndexedAccessTypeByTypeNode(ctx, typeNode);
  }

  if(isTypeReferenceNode(typeNode)){
    return createTypeReferenceType(ctx, typeNode);
  } else if(isExpressionWithTypeArguments(typeNode)){
    return createExpressionType(ctx, typeNode);
  }

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return interpretType(ctx, type);

}


/* Getting the type by symbol (using getTypeOfSymbolAtLocation()) resolves generics */
export function createTypeBySymbol(ctx: InterpreterContext, symbol: Symbol): Types {
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  const type = declaration
    ? ctx.checker.getTypeOfSymbolAtLocation(symbol, declaration)
    : ctx.checker.getTypeOfSymbol(symbol);
  return interpretType(ctx, type);
}

export function createTypeByDeclaration(ctx: InterpreterContext, declaration: Declaration): Types {
  const type = ctx.checker.getTypeAtLocation(declaration);
  return interpretType(ctx, type);
}


export function interpretType(ctx: InterpreterContext, type: Type): Types {

  if(isTypeLocked(ctx, type)){
    return createLinkToType(ctx, type);
  }

  if(isObjectType(type)){
    return interpretObjectType(ctx, type);
  }


  //-- Order is important! Parse most specific types first

  if(isStringLiteralType(type)){
    return createStringLiteralType(ctx, type);
  } else if(isNumberLiteralType(type)){
    return createNumberLiteralType(ctx, type);
  } else if(isBigIntLiteralType(type)){
    return createBigIntLiteralType(ctx, type);
  } else if(isBooleanLiteralType(type)){
    return createBooleanLiteralType(ctx, type);
  } else if(isStringType(type)){
    return createStringType(ctx, type);
  } else if(isNumberType(type)){
    return createNumberType(ctx, type);
  } else if(isBooleanType(type)){
    return createBooleanType(ctx, type);
  } else if(isBigIntType(type)){
    return createBigIntType(ctx, type);
  } else if(isVoidType(type)){
    return createVoidType(ctx, type);
  } else if(isUndefinedType(type)){
    return createUndefinedType(ctx, type);
  } else if(isNullType(type)){
    return createNullType(ctx, type);
  } else if(isAnyType(type)){
    return createAnyType(ctx, type);
  } else if(isUnknownType(type)){
    return createUnknownType(ctx, type);
  } else if(isNeverType(type)){
    return createNeverType(ctx, type);
  } else if(isSymbolType(type)){
    return createSymbolType(ctx, type);
  } else if(isUnionType(type)){
    return createUnionType(ctx, type);
  } else if(isIntersectionType(type)){
    return createIntersectionType(ctx, type);
  } else if(isTypeParameterType(type)){
    return createTypeParameterType(ctx, type);
  } else if(isConditionalType(type)){
    return createConditionalType(ctx, type);
  } else if(isIndexedAccessType(type)){
    return createIndexedAccessType(ctx, type);
  } else {
    return createUnresolved(ctx, type);
  }

}


export function interpretObjectType(ctx: InterpreterContext, type: TSObjectType): Types {

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  }

  if(isFunctionLikeType(type)){
    return createFunctionType(ctx, type);
  } else if(isTypeLiteralType(type)){
    return createTypeLiteralType(ctx, type);
  } else if(isObjectLiteralType(type)){
    return createObjectLiteralByType(ctx, type);
  } else if(isInterfaceType(type)){
    return createInterfaceByType(ctx, type);
  } else if(isClassType(type)){
    return createClassType(ctx, type);
  }

  return createObjectLikeType(ctx, type);

}
