import { FunctionLikeDeclaration, Signature as TSSignature, SignatureDeclaration } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Signature, TypeKind } from "../../types/types.js";
import { getIdByDeclaration } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getModifiersByDeclaration } from "../compositions/modifiers.js";
import { getParametersBySignatureDeclaration } from "../compositions/parameters.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getReturnTypeByCallSignature } from "../compositions/return-type.js";


export function createSignatureByDeclaration(ctx: CompilerContext, declaration: FunctionLikeDeclaration | SignatureDeclaration): Signature {

  const signature = ctx.checker.getSignatureFromDeclaration(declaration);

  assert(signature, "FunctionLike signature is not found");

  const id = getIdByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);

  const parameters = getParametersBySignatureDeclaration(ctx, declaration);
  const returnType = getReturnTypeByCallSignature(ctx, signature);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const kind = TypeKind.Signature;

  return {
    description,
    example,
    id,
    kind,
    modifiers,
    parameters,
    position,
    returnType
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
