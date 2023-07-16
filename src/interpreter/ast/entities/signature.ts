import { getDeclaredType, getResolvedTypeByType } from "unwritten:interpreter/ast/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import {
  createParameterEntity,
  createTypeParameterEntityByTypeParameter
} from "unwritten:interpreter:ast/entities/index.js";
import { getDeclarationId, getSymbolIdByDeclaration } from "unwritten:interpreter:ast/shared/id.js";
import {
  getDescriptionByDeclaration,
  getJSDocTagsByDeclaration,
  getReturnTypeDescription
} from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers.js";
import { getNameByDeclaration } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { assert } from "unwritten:utils:general.js";

import type { Signature as TSSignature, SignatureDeclaration } from "typescript";

import type { SignatureEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createSignatureEntity(ctx: InterpreterContext, signature: TSSignature): SignatureEntity {

  const symbolId = signature.declaration && getSymbolIdByDeclaration(ctx, signature.declaration);
  const declarationId = signature.declaration && getDeclarationId(ctx, signature.declaration);
  const position = signature.declaration && getPositionByDeclaration(ctx, signature.declaration);
  const description = signature.declaration && getDescriptionByDeclaration(ctx, signature.declaration);
  const modifiers = signature.declaration && getModifiersByDeclaration(ctx, signature.declaration);
  const jsdocTags = signature.declaration && getJSDocTagsByDeclaration(ctx, signature.declaration);
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
    ...jsdocTags,
    declarationId,
    description,
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

  const type = declaration?.type
    ? getDeclaredType(ctx, declaration.type)
    : getResolvedTypeByType(ctx, tsReturnType);

  const description = declaration && getReturnTypeDescription(ctx, declaration);

  assert(tsReturnType, "Function return type is missing.");

  return {
    description,
    ...type
  };

}
