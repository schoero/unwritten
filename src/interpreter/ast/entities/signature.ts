import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import {
  createParameterEntity,
  createTypeParameterEntityByTypeParameter
} from "unwritten:interpreter:ast/entities/index";
import { getDeclarationId, getSymbolIdByDeclaration } from "unwritten:interpreter:ast/shared/id";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers";
import { getNameByDeclaration } from "unwritten:interpreter:ast/shared/name";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";
import { assert } from "unwritten:utils:general";

import {
  getDeclaredTypeByTypeNode,
  getResolvedTypeByType,
  getResolvedTypeByTypeNode,
  getTypeByResolvedAndDeclaredType
} from "../type";

import type { Signature as TSSignature, SignatureDeclaration } from "typescript";

import type { SignatureEntity } from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createSignatureEntity(ctx: InterpreterContext, signature: TSSignature): SignatureEntity {

  // Implicit construct signatures have no declaration.
  const symbolId = signature.declaration && getSymbolIdByDeclaration(ctx, signature.declaration);
  const declarationId = signature.declaration && getDeclarationId(ctx, signature.declaration);
  const position = signature.declaration && getPositionByDeclaration(ctx, signature.declaration);
  const modifiers = signature.declaration && getModifiersByDeclaration(ctx, signature.declaration);
  const jsdocProperties = signature.declaration && getJSDocProperties(ctx, signature.declaration);
  const name = signature.declaration && getNameByDeclaration(ctx, signature.declaration);

  const parameters = signature.getParameters().map(
    parameter => createParameterEntity(ctx, parameter)
  );

  const typeParameters = signature.getTypeParameters()?.map(
    typeParameter => createTypeParameterEntityByTypeParameter(ctx, typeParameter)
  );

  const returnType = getReturnTypeBySignature(ctx, signature);
  const kind = EntityKind.Signature;

  return {
    ...jsdocProperties,
    declarationId,
    kind,
    modifiers,
    name,
    parameters,
    position,
    returnType,
    symbolId,
    typeParameters
  };

}


function getReturnTypeBySignature(ctx: InterpreterContext, signature: TSSignature) {

  const declaration = signature.getDeclaration() as SignatureDeclaration | undefined;
  const tsReturnType = signature.getReturnType();

  /**
   * The type node of the declaration is the type annotation of a function.
   * The declaration itself is the signature. Thats why we need to get the resolved type via the type node.
   */
  const declaredType = declaration?.type && getDeclaredTypeByTypeNode(ctx, declaration.type);
  const resolvedType = declaration?.type
    ? getResolvedTypeByTypeNode(ctx, declaration.type)
    : getResolvedTypeByType(ctx, tsReturnType);

  const type = getTypeByResolvedAndDeclaredType(ctx, resolvedType, declaredType);
  const jsdocProperties = declaration && getJSDocProperties(ctx, declaration);
  const description = jsdocProperties?.returns?.[0]?.content;

  assert(tsReturnType, "Function return type is missing.");

  return {
    description,
    ...type
  };

}
