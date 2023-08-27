import { isFunctionLikeEntity } from "unwritten:typeguards/entities.js";

import type {
  FunctionLikeEntity,
  PropertyEntity,
  SignatureEntity
} from "unwritten:interpreter/type-definitions/entities.js";
import type { DeepRequiredByKey } from "unwritten:type-definitions/utils.js";


export function filterImplicitSignatures(signatures: SignatureEntity[]): DeepRequiredByKey<SignatureEntity, "declarationId">[] {
  return signatures.filter(signature => signature.declarationId !== undefined) as DeepRequiredByKey<SignatureEntity, "declarationId">[];
}

export function filterPrivateMembers<Entities extends FunctionLikeEntity | PropertyEntity>(entities: Entities[]): Entities[] {
  return entities.filter(entity => {
    if(isFunctionLikeEntity(entity)){
      return entity.signatures.every(signature => !signature.modifiers?.includes("private"));
    }
    return !entity.modifiers?.includes("private");
  });
}


export function filterPrivateSignatures(signatures: SignatureEntity[]): SignatureEntity[] {
  return signatures.filter(signature => !signature.modifiers?.includes("private"));
}
