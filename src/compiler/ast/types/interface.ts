import { createObjectLikeType } from "quickdoks:compiler:ast/types/object.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getNameByType } from "quickdoks:compiler:mixins/name.js";
import { lockType } from "quickdoks:compiler:utils/ts.js";

import type { InterfaceType as TSInterfaceType } from "typescript";

import type { InterfaceType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
