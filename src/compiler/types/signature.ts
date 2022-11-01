import { FunctionLikeDeclaration, SignatureDeclaration } from "typescript";
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
