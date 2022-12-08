import { UnionType as TSUnionType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, UnionType } from "quickdoks:types:types.js";


export function createUnionTypeByType(ctx: CompilerContext, type: TSUnionType): UnionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => parseType(ctx, type));
  const kind = Kind.UnionType;

  return {
    id,
    kind,
    types
  };

}
