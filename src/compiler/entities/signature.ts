import { FunctionLikeDeclaration, Signature as TSSignature, SignatureDeclaration } from "typescript";

import { getIdByDeclaration } from "quickdoks:compiler:compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "quickdoks:compiler:compositions/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:compositions/modifiers.js";
import { getNameByDeclaration } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { getReturnTypeByCallSignature } from "quickdoks:compiler:compositions/return-type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Signature } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";

import { createParameterByDeclaration } from "./parameter.js";
import { createTypeParameterByDeclaration } from "./type-parameter.js";


export function createSignatureByDeclaration(ctx: CompilerContext, declaration: FunctionLikeDeclaration | SignatureDeclaration): Signature {

  const signature = ctx.checker.getSignatureFromDeclaration(declaration);

  assert(signature, "FunctionLike signature is not found");

  const id = getIdByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);

  const parameters = declaration.parameters.map(declaration => createParameterByDeclaration(ctx, declaration));
  const typeParameters = declaration.typeParameters?.map(declaration => createTypeParameterByDeclaration(ctx, declaration));
  const returnType = getReturnTypeByCallSignature(ctx, signature);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const kind = Kind.Signature;

  return {
    description,
    example,
    id,
    kind,
    modifiers,
    name,
    parameters,
    position,
    returnType,
    typeParameters
  };

}


export function createSignatureBySignature(ctx: CompilerContext, signature: TSSignature): Signature {

  /*
   * If we would try and create the signature directly, signatures.parameters would be a symbol array instead of a declaration array.
   * The reason for that is that parameters are actually symbols. We would need the figure out the index of the signature if
   * it was overloaded, and then get the parameter declaration with the same index. If we just go with the signature declaration,
   * we can just use the parameters array directly as TypeScript already did the work for us.
   * ```ts
   * function test(sameParameterSymbol: string): string;
   * function test(sameParameterSymbol: string, somethingElse: string): string;
   * ```
   */

  const signatureDeclaration = signature.getDeclaration();
  return createSignatureByDeclaration(ctx, signatureDeclaration);
}
