import { createParameterEntity, createTypeParameterEntity } from "unwritten:interpreter:ast/entities/index.js";
import { parseType } from "unwritten:interpreter:ast/index.js";
import { getDeclarationId, getSymbolIdByDeclaration } from "unwritten:interpreter:ast/shared/id.js";
import {
  getDescriptionByDeclaration,
  getJSDocTagsByDeclaration,
  getReturnTypeDescription
} from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getModifiersByDeclaration } from "unwritten:interpreter:ast/shared/modifiers.js";
import { getNameByDeclaration } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { assert } from "unwritten:utils:general.js";

import type { Signature as TSSignature, SignatureDeclaration } from "typescript";

import type { SignatureEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createSignatureEntity(ctx: InterpreterContext, signature: TSSignature): SignatureEntity {

  const declaration = signature.getDeclaration() as SignatureDeclaration | undefined;

  const fromDeclaration = declaration && parseSignatureDeclaration(ctx, declaration);

  const returnType = getReturnTypeBySignature(ctx, signature);
  const kind = EntityKind.Signature;

  return <SignatureEntity>{
    ...fromDeclaration,
    kind,
    returnType
  };

}


function parseSignatureDeclaration(ctx: InterpreterContext, declaration: SignatureDeclaration): Omit<SignatureEntity, "kind" | "returnType"> {

  const declarationId = getDeclarationId(ctx, declaration);
  const symbolId = getSymbolIdByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const parameters = declaration.parameters.map(declaration => createParameterEntity(ctx, declaration));
  const typeParameters = declaration.typeParameters?.map(declaration => createTypeParameterEntity(ctx, declaration));
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);

  return {
    ...jsdocTags,
    declarationId,
    description,
    modifiers,
    name,
    parameters,
    position,
    symbolId,
    typeParameters
  };

}


function getReturnTypeBySignature(ctx: InterpreterContext, signature: TSSignature) {

  const declaration = signature.getDeclaration() as SignatureDeclaration | undefined;
  const tsReturnType = signature.getReturnType();

  const type = parseType(ctx, tsReturnType);
  const description = declaration && getReturnTypeDescription(ctx, declaration);

  assert(tsReturnType, "Function return type is missing.");

  return {
    ...type,
    description
  };

}
