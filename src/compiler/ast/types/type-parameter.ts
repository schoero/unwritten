import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { getNameByType } from "quickdoks:compiler:mixins/name.js";
import { lockType } from "quickdoks:compiler:utils/ts.js";

import type { TypeParameter } from "typescript";

import type { TypeParameterType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export const createTypeParameterType = (ctx: CompilerContext, type: TypeParameter): TypeParameterType => lockType(ctx, type, () => {

  const tsConstraint = type.getConstraint();
  const constraint = tsConstraint && parseType(ctx, tsConstraint);
  const name = getNameByType(ctx, type);
  const id = getIdByType(ctx, type);
  const kind = TypeKind.TypeParameter;

  return <TypeParameterType>{
    constraint,
    id,
    kind,
    name
  };

});
