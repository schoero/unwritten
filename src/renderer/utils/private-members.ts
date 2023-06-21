import { isFunctionLikeEntity } from "unwritten:typeguards/entities.js";

import type {
  FunctionLikeEntities,
  PropertyEntity,
  SignatureEntity
} from "unwritten:interpreter/type-definitions/entities.js";


export function filterPrivateMembers<Entities extends FunctionLikeEntities | PropertyEntity>(entities: Entities[]): Entities[] {
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
