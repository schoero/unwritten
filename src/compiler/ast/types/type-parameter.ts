import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { getNameByType } from "unwritten:compiler/ast/shared/name.js";
import { parseType } from "unwritten:compiler:ast/index.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { lockType } from "unwritten:compiler:utils/ts.js";

import type { TypeParameter } from "typescript";

import type { TypeParameterType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
