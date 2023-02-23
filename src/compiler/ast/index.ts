import { getNameBySymbol } from "unwritten:compiler/ast/shared/name.js";
import { createFunctionType } from "unwritten:compiler:ast/types/function.js";
import { createObjectLikeType } from "unwritten:compiler:ast/types/object.js";
import {
  createClassEntity,
  createEnumEntity,
  createFunctionEntity,
  createInterfaceEntity,
  createModuleEntity,
  createNamespaceEntity,
  createPropertyEntity,
  createSourceFileEntity,
  createTypeAliasEntity,
  createVariableEntity
} from "unwritten:compiler:entities";
import {
  isClassSymbol,
  isEnumSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isModuleSymbol,
  isNamespaceSymbol,
  isPropertySymbol,
  isSourceFileSymbol,
  isTypeAliasSymbol,
  isVariableSymbol
} from "unwritten:compiler:typeguards/symbols.js";
import {
  isArrayTypeNode,
  isExpressionWithTypeArguments,
  isTemplateLiteralTypeNode,
  isTupleTypeNode,
  isTypeQueryNode,
  isTypeReferenceNode
} from "unwritten:compiler:typeguards/type-nodes.js";
import {
  isAnyType,
  isBigIntLiteralType,
  isBigIntType,
  isBooleanLiteralType,
  isBooleanType,
  isClassType,
  isConditionalType,
  isFunctionLikeType,
  isInterfaceType,
  isIntersectionType,
  isMappedType,
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
} from "unwritten:compiler:typeguards/types.js";
import {
  createAnyType,
  createArrayTypeByArrayTypeNode,
  createBigIntLiteralType,
  createBigIntType,
  createBooleanLiteralType,
  createBooleanType,
  createClassType,
  createConditionalType,
  createExpressionType,
  createInterfaceByType,
  createIntersectionTypeByType,
  createLinkToType,
  createMappedTypeByType,
  createNeverType,
  createNullType,
  createNumberLiteralType,
  createNumberType,
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
  createUnionTypeByType,
  createUnknownType,
  createUnresolvedByType,
  createUnresolvedType,
  createVoidType
} from "unwritten:compiler:types";
import { isTypeLocked, resolveSymbolInCaseOfImport } from "unwritten:compiler:utils/ts.js";
import { isSymbolExcluded } from "unwritten:utils:exclude.js";
import { assert } from "unwritten:utils:general.js";

import type { Declaration, ObjectType as TSObjectType, Symbol, Type, TypeNode } from "typescript";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.d.js";
import type { Entities } from "unwritten:compiler:type-definitions/entities.js";
import type { Types, UnresolvedType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableEntities[] {
  assert(isSourceFileSymbol(sourceFileSymbol), "Source file symbol is not a source file symbol");
  return createSourceFileEntity(ctx, sourceFileSymbol).exports;
}


export function parseSymbol(ctx: CompilerContext, symbol: Symbol): Entities | UnresolvedType {

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
  } else if(isSourceFileSymbol(symbol)){
    return createSourceFileEntity(ctx, resolvedSymbol);
  } else if(isPropertySymbol(symbol)){
    return createPropertyEntity(ctx, resolvedSymbol);
  } else {
    return createUnresolvedType(ctx, resolvedSymbol);
  }

}


export function parseTypeNode(ctx: CompilerContext, typeNode: TypeNode): Types {

  if(isArrayTypeNode(typeNode)){
    return createArrayTypeByArrayTypeNode(ctx, typeNode);
  } else if(isTupleTypeNode(typeNode)){
    return createTupleByTupleTypeNode(ctx, typeNode);
  } else if(isTypeQueryNode(typeNode)){
    return createTypeQueryType(ctx, typeNode);
  } else if(isTemplateLiteralTypeNode(typeNode)){
    return createTemplateLiteralType(ctx, typeNode);
  }

  if(isTypeReferenceNode(typeNode)){
    return createTypeReferenceType(ctx, typeNode);
  } else if(isExpressionWithTypeArguments(typeNode)){
    return createExpressionType(ctx, typeNode);
  }

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return parseType(ctx, type);

}


/* Getting the type by symbol (using getTypeOfSymbolAtLocation()) resolves generics */
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

  if(isTypeLocked(ctx, type)){
    return createLinkToType(ctx, type);
  }

  if(isObjectType(type)){
    return parseObjectType(ctx, type);
  }


  //-- Order is important! Parse most specific types first

  if(isConditionalType(type)){
    return createConditionalType(ctx, type);
  } else if(isStringLiteralType(type)){
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
    return createUnionTypeByType(ctx, type);
  } else if(isIntersectionType(type)){
    return createIntersectionTypeByType(ctx, type);
  } else if(isTypeParameterType(type)){
    return createTypeParameterType(ctx, type);
  } else {
    return createUnresolvedByType(ctx, type);
  }

}


export function parseObjectType(ctx: CompilerContext, type: TSObjectType): Types {

  if(isTupleTypeReferenceType(type)){
    return createTupleTypeByTypeReference(ctx, type);
  }

  if(isSymbolExcluded(ctx, type.symbol)){
    return createUnresolvedType(ctx, type.symbol);
  }

  if(isMappedType(type)){
    return createMappedTypeByType(ctx, type);
  } else if(isFunctionLikeType(type)){
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
