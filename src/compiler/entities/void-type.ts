import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isVoidType } from "quickdoks:compiler:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, VoidType } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createVoidType(ctx: CompilerContext, type: Type): VoidType {

  assert(isVoidType(type), "type is not a void type");

  const kind = Kind.Void;
  const name = "void";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
