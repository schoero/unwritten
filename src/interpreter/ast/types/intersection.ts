import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType, withLockedType } from "unwritten:interpreter/utils/ts.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";

import { getTypeByType } from "../type";

import type { IntersectionType as TSIntersectionType } from "typescript";

import type { IntersectionType } from "unwritten:interpreter/type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createIntersectionType = (ctx: InterpreterContext, type: TSIntersectionType): IntersectionType => withCachedType(ctx, type, () => withLockedType(ctx, type, () => {

  const typeId = getTypeId(ctx, type);
  const types = type.types.map(type => getTypeByType(ctx, type));
  const kind = TypeKind.Intersection;

  return {
    kind,
    typeId,
    types
  };

}));
