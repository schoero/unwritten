import { parseType } from "unwritten:interpreter:ast/index.js";
import { getNameByType } from "unwritten:interpreter:ast/shared/name.js";
import { createObjectLikeType } from "unwritten:interpreter:ast/types/object.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { withLockedType } from "unwritten:interpreter:utils/ts.js";

import type { InterfaceType as TSInterfaceType } from "typescript";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export const createInterfaceByType = (ctx: InterpreterContext, type: TSInterfaceType): InterfaceType => withLockedType(ctx, type, () => {

  const objectType = createObjectLikeType(ctx, type, TypeKind.Interface);
  const typeParameters = type.typeParameters?.map(type => parseType(ctx, type));
  const name = getNameByType(ctx, type);

  return <InterfaceType>{
    ...objectType,
    name,
    typeParameters
  };
});
