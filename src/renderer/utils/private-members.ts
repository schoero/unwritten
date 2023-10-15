import { isFunctionLikeEntity } from "unwritten:typeguards/entities.js";

import type {
  ExplicitSignatureEntity,
  FunctionLikeEntity,
  PropertyEntity,
  SignatureEntity
} from "unwritten:interpreter/type-definitions/entities.js";


export function filterOutImplicitSignatures(signatures: SignatureEntity[]): ExplicitSignatureEntity[] {
  return signatures.filter(signature => signature.declarationId !== undefined) as ExplicitSignatureEntity[];
}

export function filterOutPrivateMembers<Entities extends FunctionLikeEntity | PropertyEntity>(entities: Entities[]): Entities[] {
  return entities.filter(entity => {
    if(isFunctionLikeEntity(entity)){
      return entity.signatures.every(signature => !signature.modifiers?.includes("private"));
    }
    return !entity.modifiers?.includes("private");
  });
}

export function filterOutPrivateSignatures(signatures: SignatureEntity[]): SignatureEntity[] {
  return signatures.filter(signature => !signature.modifiers?.includes("private"));
}
