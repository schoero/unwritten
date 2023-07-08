import ts, {
  type Declaration,
  type ObjectType as TSObjectType,
  type Symbol,
  type Type,
  type TypeNode
} from "typescript";

import { getPositionBySymbol } from "unwritten:interpreter/ast/shared/position.js";
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
  createVariableEntity
} from "unwritten:interpreter:ast/entities/index.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import {
  createAnyType,
  createArrayType,
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
  isExportAssignmentSymbol,
  isFunctionSymbol,
  isInterfaceSymbol,
  isModuleSymbol,
  isNamespaceExportSymbol,
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
import { isTypeLocked } from "unwritten:interpreter:utils/ts.js";
import { getEnumFlagNames } from "unwritten:tests:utils/debug.js";
import { isSymbolExcluded } from "unwritten:utils/exclude.js";
import { assert } from "unwritten:utils:general.js";

import type { ExportableEntities } from "unwritten:interpreter/type-definitions/entities.js";
import type { Types } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function interpret(ctx: InterpreterContext, sourceFileSymbol: Symbol): ExportableEntities[] {
  assert(isSourceFileSymbol(sourceFileSymbol), "Source file symbol is not a source file symbol");
  return createSourceFileEntity(ctx, sourceFileSymbol).exports;
}


export function interpretSymbol(ctx: InterpreterContext, symbol: Symbol): ExportableEntities {

  if(isVariableSymbol(symbol)){
    return createVariableEntity(ctx, symbol);
  } else if(isFunctionSymbol(symbol)){
    return createFunctionEntity(ctx, symbol);
  } else if(isClassSymbol(symbol)){
    return createClassEntity(ctx, symbol);
  } else if(isInterfaceSymbol(symbol)){
    return createInterfaceEntity(ctx, symbol);
  } else if(isTypeAliasSymbol(symbol)){
    return createTypeAliasEntity(ctx, symbol);
  } else if(isEnumSymbol(symbol)){
    return createEnumEntity(ctx, symbol);
  } else if(isNamespaceSymbol(symbol)){
    return createNamespaceEntity(ctx, symbol);
  } else if(isNamespaceExportSymbol(symbol)){
    return createNamespaceEntityFromNamespaceExport(ctx, symbol);
  } else if(isModuleSymbol(symbol)){
    return createModuleEntity(ctx, symbol);
  } else if(isExportAssignmentSymbol(symbol)){
    return createExportAssignmentEntity(ctx, symbol);
  } else {

    const name = getNameBySymbol(ctx, symbol);
    const formattedName = name ? `"${name}"` : "";
    const position = getPositionBySymbol(ctx, symbol);
    const formattedPosition = position ? `at ${position.file}:${position.line}:${position.column}` : "";
    const symbolFlags = getEnumFlagNames(ts.SymbolFlags, symbol.flags);

    throw new RangeError(`Symbol ${formattedName} ${formattedPosition} is not exportable`);

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
  } else if(isArrayType(type)){
    return createArrayType(ctx, type);
  }

  if(isSymbolExcluded(ctx, type.symbol)){
    return createUnresolved(ctx, type);
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
