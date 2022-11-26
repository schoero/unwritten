import { UnionType as TSUnionType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, UnionType } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { parseType } from "../entry-points/type.js";


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
