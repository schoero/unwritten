import { getDeclaredType } from "unwritten:interpreter/ast/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getIdByTypeNode, getTypeId } from "unwritten:interpreter:ast/shared/id.js";

import type { ConditionalType as TSConditionalType, ConditionalTypeNode } from "typescript";

import type { ConditionalType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createConditionalTypeByTypeNode(ctx: InterpreterContext, typeNode: ConditionalTypeNode): ConditionalType {

  const typeId = getIdByTypeNode(ctx, typeNode);
  const checkType = getDeclaredType(ctx, typeNode.checkType);
  const extendsType = getDeclaredType(ctx, typeNode.extendsType);
  const trueType = getDeclaredType(ctx, typeNode.trueType);
  const falseType = getDeclaredType(ctx, typeNode.falseType);

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

export function createConditionalType(ctx: InterpreterContext, type: TSConditionalType): ConditionalType {

  const root = type.root;
  const typeId = getTypeId(ctx, type);
  const checkType = getDeclaredType(ctx, root.node.checkType);
  const extendsType = getDeclaredType(ctx, root.node.extendsType);
  const trueType = getDeclaredType(ctx, root.node.trueType);
  const falseType = getDeclaredType(ctx, root.node.falseType);

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
