import { getSymbolIdByType, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { getNameByType } from "unwritten:interpreter:ast/shared/name";
import { withLockedType } from "unwritten:interpreter:utils/ts";
import { TypeKind } from "unwritten:interpreter/enums/type";

import { getTypeByType } from "../type";

import type { TypeParameter } from "typescript";
import type { TypeParameterType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createTypeParameterType = (ctx: InterpreterContext, type: TypeParameter): TypeParameterType => withLockedType(ctx, type, () => {

  const tsConstraint = type.getConstraint();
  const constraint = tsConstraint && getTypeByType(ctx, tsConstraint);
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
