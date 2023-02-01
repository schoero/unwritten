import { createObjectLikeType } from "unwritten:compiler:ast/types/object.js";
import { parseType } from "unwritten:compiler:entry-points/type.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getNameByType } from "unwritten:compiler:shared/name.js";
import { lockType } from "unwritten:compiler:utils/ts.js";

import type { InterfaceType as TSInterfaceType } from "typescript";

import type { InterfaceType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export const createInterfaceByType = (ctx: CompilerContext, type: TSInterfaceType): InterfaceType => lockType(ctx, type, () => {

  const objectType = createObjectLikeType(ctx, type, TypeKind.Interface);
  const typeParameters = type.typeParameters?.map(type => parseType(ctx, type));
  const name = getNameByType(ctx, type);

  return <InterfaceType>{
    ...objectType,
    name,
    typeParameters
  };
});
