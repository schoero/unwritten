import { UnionType as TSUnionType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { TypeKind, UnionType } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { createTypeByType } from "./type.js";


export function createUnionTypeByType(ctx: CompilerContext, type: TSUnionType): UnionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => createTypeByType(ctx, type));
  const kind = TypeKind.UnionType;

  return {
    id,
    kind,
    types
  };

}
