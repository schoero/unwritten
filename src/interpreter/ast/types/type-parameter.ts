import { parseType } from "unwritten:interpreter:ast/index.js";
import { getSymbolIdByType, getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByType } from "unwritten:interpreter:ast/shared/name.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { withLockedType } from "unwritten:interpreter:utils/ts.js";

import type { TypeParameter } from "typescript";

import type { TypeParameterType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export const createTypeParameterType = (ctx: InterpreterContext, type: TypeParameter): TypeParameterType => withLockedType(ctx, type, () => {

  const tsConstraint = type.getConstraint();
  const constraint = tsConstraint && parseType(ctx, tsConstraint);
  const name = getNameByType(ctx, type);
  const typeId = getTypeId(ctx, type);
  const symbolId = getSymbolIdByType(ctx, type);
  const kind = TypeKind.TypeParameter;

  return <TypeParameterType>{
    constraint,
    kind,
    name,
    symbolId,
    typeId
  };

});