import { getIdByTypeNode, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType, withLockedType } from "unwritten:interpreter/utils/ts.js";

import { getTypeByTypeNode } from "../type";

import type { ConditionalTypeNode, ConditionalType as TSConditionalType } from "typescript";
import type { ConditionalType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createConditionalTypeByTypeNode(ctx: InterpreterContext, typeNode: ConditionalTypeNode): ConditionalType {

  const typeId = getIdByTypeNode(ctx, typeNode);
  const checkType = getTypeByTypeNode(ctx, typeNode.checkType);
  const extendsType = getTypeByTypeNode(ctx, typeNode.extendsType);
  const trueType = getTypeByTypeNode(ctx, typeNode.trueType);
  const falseType = getTypeByTypeNode(ctx, typeNode.falseType);

  const kind = TypeKind.Conditional;

  return {
    checkType,
    extendsType,
    falseType,
    kind,
    trueType,
    typeId
  };

}

export const createConditionalType = (ctx: InterpreterContext, type: TSConditionalType): ConditionalType => withCachedType(ctx, type, () => withLockedType(ctx, type, () => {

  const root = type.root;
  const typeId = getTypeId(ctx, type);
  const checkType = getTypeByTypeNode(ctx, root.node.checkType);
  const extendsType = getTypeByTypeNode(ctx, root.node.extendsType);
  const trueType = getTypeByTypeNode(ctx, root.node.trueType);
  const falseType = getTypeByTypeNode(ctx, root.node.falseType);

  const kind = TypeKind.Conditional;

  return {
    checkType,
    extendsType,
    falseType,
    kind,
    trueType,
    typeId
  };

}));
