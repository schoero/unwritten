import { Type } from "typescript";

import { parseType } from "quickdoks:compiler/entry-points/type.js";
import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, ThisType } from "quickdoks:types:types.js";


export function createThisTypeByType(ctx: CompilerContext, thisType: Type): ThisType {

  const id = getIdByType(ctx, thisType);
  const tsType = thisType.getConstraint();
  const type = tsType && parseType(ctx, tsType);
  const kind = Kind.ThisType;

  return {
    id,
    kind,
    type
  };

}
