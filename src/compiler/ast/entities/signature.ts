import { createParameterEntity, createTypeParameterEntity } from "quickdoks:compiler:entities";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByDeclaration } from "quickdoks:compiler:mixins/id.js";
import {
  getDescriptionByDeclaration,
  getJSDocTagsByDeclaration,
  getReturnTypeDescription
} from "quickdoks:compiler:mixins/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:mixins/modifiers.js";
import { getNameByDeclaration } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import { assert } from "quickdoks:utils:general.js";

import type { Signature as TSSignature, SignatureDeclaration } from "typescript";

import type { SignatureEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createSignatureEntity(ctx: CompilerContext, signature: TSSignature): SignatureEntity {

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


function parseSignatureDeclaration(ctx: CompilerContext, declaration: SignatureDeclaration) {

  const id = getIdByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const parameters = declaration.parameters.map(declaration => createParameterEntity(ctx, declaration));
  const typeParameters = declaration.typeParameters?.map(declaration => createTypeParameterEntity(ctx, declaration));
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);

  return {
    description,
    id,
    modifiers,
    name,
    parameters,
    position,
    typeParameters,
    ...jsdocTags
  };

}


function getReturnTypeBySignature(ctx: CompilerContext, signature: TSSignature) {

  const declaration = signature.getDeclaration() as SignatureDeclaration | undefined;
  const tsReturnType = signature.getReturnType();

  const type = parseType(ctx, tsReturnType);
  const description = declaration && getReturnTypeDescription(ctx, declaration);

  assert(tsReturnType, "Function return type is missing.");

  return {
    description,
    ...type
  };

}
