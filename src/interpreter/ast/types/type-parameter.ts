import { parseType } from "unwritten:interpreter:ast/index.js";
import { getIdByType } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByType } from "unwritten:interpreter:ast/shared/name.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { lockType } from "unwritten:interpreter:utils/ts.js";

import type { TypeParameter } from "typescript";

import type { TypeParameterType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export const createTypeParameterType = (ctx: InterpreterContext, type: TypeParameter): TypeParameterType => lockType(ctx, type, () => {

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
