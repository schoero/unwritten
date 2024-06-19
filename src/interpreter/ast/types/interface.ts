import { TypeKind } from "unwritten:interpreter/enums/type";
import { createObjectLikeType } from "unwritten:interpreter:ast/types/index";
import { withCachedType, withLockedType } from "unwritten:interpreter:utils/ts";

import { getTypeByType } from "../type";

import type { InterfaceType as TSInterfaceType } from "typescript";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createInterfaceByType = (ctx: InterpreterContext, type: TSInterfaceType): InterfaceType => withCachedType(ctx, type, () => withLockedType(ctx, type, () => {

  const objectType = createObjectLikeType(ctx, type, TypeKind.Interface);
  const typeParameters = type.typeParameters?.map(type => getTypeByType(ctx, type));

  return <InterfaceType>{
    ...objectType,
    typeParameters
  };

}));
