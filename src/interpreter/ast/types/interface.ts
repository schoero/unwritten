import { TypeKind } from "unwritten:interpreter/enums/type";
import { getNameByType } from "unwritten:interpreter:ast/shared/name";
import { createObjectLikeType } from "unwritten:interpreter:ast/types/index";
import { withLockedType } from "unwritten:interpreter:utils/ts";

import { getTypeByType } from "../type";

import type { InterfaceType as TSInterfaceType } from "typescript";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createInterfaceByType = (ctx: InterpreterContext, type: TSInterfaceType): InterfaceType => withLockedType(ctx, type, () => {

  const objectType = createObjectLikeType(ctx, type, TypeKind.Interface);
  const typeParameters = type.typeParameters?.map(type => getTypeByType(ctx, type));
  const name = getNameByType(ctx, type);

  return <InterfaceType>{
    ...objectType,
    name,
    typeParameters
  };

});
