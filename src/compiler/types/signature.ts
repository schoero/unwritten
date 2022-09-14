import { FunctionLikeDeclaration, SignatureDeclaration } from "typescript";

import { assert } from "vitest";

import { EntityKind, Signature } from "../../types/types.js";
import { getIdByDeclaration } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getParametersBySignatureDeclaration } from "../compositions/parameters.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getReturnTypeByCallSignature } from "../compositions/return-type.js";
import { getContext } from "../context/index.js";


export function createSignatureByDeclaration(declaration: FunctionLikeDeclaration | SignatureDeclaration): Signature {

  const signature = getContext().checker.getSignatureFromDeclaration(declaration);

  assert(signature, "FunctionLike signature is not found");

  const id = getIdByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const parameters = getParametersBySignatureDeclaration(declaration);
  const returnType = getReturnTypeByCallSignature(signature);
  const description = getDescriptionByDeclaration(declaration);

  const kind = EntityKind.Signature;

  return {
    id,
    kind,
    example,
    description,
    position,
    parameters,
    returnType
  };

}