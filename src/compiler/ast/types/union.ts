import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { UnionType as TSUnionType } from "typescript";

import type { UnionType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createUnionTypeByType(ctx: CompilerContext, type: TSUnionType): UnionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => parseType(ctx, type));
  const kind = TypeKind.UnionType;

  return {
    id,
    kind,
    types
  };

}
