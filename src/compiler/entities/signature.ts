import { Signature as TSSignature, SignatureDeclaration } from "typescript";

import { getIdByDeclaration } from "quickdoks:compiler:compositions/id.js";
import {
  getDescriptionByDeclaration,
  getExampleByDeclaration,
  getReturnTypeDescription
} from "quickdoks:compiler:compositions/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:compositions/modifiers.js";
import { getNameByDeclaration } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, Signature } from "quickdoks:type-definitions/types.d.js";

import { createParameterByDeclaration } from "./parameter.js";
import { createTypeParameterByDeclaration } from "./type-parameter.js";


export function createSignatureBySignature(ctx: CompilerContext, signature: TSSignature): Signature {

  const declaration = signature.getDeclaration() as SignatureDeclaration | undefined;

  const fromDeclaration = declaration && _parseSignatureDeclaration(ctx, declaration);

  const returnType = _getReturnTypeBySignature(ctx, signature);
  const kind = Kind.Signature;

  return <Signature>{
    ...fromDeclaration,
    kind,
    returnType
  };

}


function _parseSignatureDeclaration(ctx: CompilerContext, declaration: SignatureDeclaration) {

  const id = getIdByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);

  const parameters = declaration.parameters.map(declaration => createParameterByDeclaration(ctx, declaration));
  const typeParameters = declaration.typeParameters?.map(declaration => createTypeParameterByDeclaration(ctx, declaration));
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);

  return {
    description,
    example,
    id,
    modifiers,
    name,
    parameters,
    position,
    typeParameters
  };

}


function _getReturnTypeBySignature(ctx: CompilerContext, signature: TSSignature) {

  const declaration = signature.getDeclaration() as SignatureDeclaration | undefined;

  const returnType = signature.getReturnType();
  const returnTypeDescription = declaration && getReturnTypeDescription(ctx, declaration);

  assert(returnType, "Function return type is missing.");

  return {
    description: returnTypeDescription,
    ...parseType(ctx, returnType)
  };

}
