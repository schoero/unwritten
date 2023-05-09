import { interpretTypeNode } from "unwritten:interpreter:ast/index.js";
import { getIdByTypeNode, getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";

import type { ConditionalType as TSConditionalType, ConditionalTypeNode } from "typescript";

import type { ConditionalType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createConditionalTypeByTypeNode(ctx: InterpreterContext, typeNode: ConditionalTypeNode): ConditionalType {

  const typeId = getIdByTypeNode(ctx, typeNode);
  const checkType = interpretTypeNode(ctx, typeNode.checkType);
  const extendsType = interpretTypeNode(ctx, typeNode.extendsType);
  const trueType = interpretTypeNode(ctx, typeNode.trueType);
  const falseType = interpretTypeNode(ctx, typeNode.falseType);

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
  const id = getTypeId(ctx, type);
  const checkType = interpretTypeNode(ctx, root.node.checkType);
  const extendsType = interpretTypeNode(ctx, root.node.extendsType);
  const trueType = interpretTypeNode(ctx, root.node.trueType);
  const falseType = interpretTypeNode(ctx, root.node.falseType);

  const kind = TypeKind.Conditional;

  return {
    checkType,
    extendsType,
    falseType,
    kind,
    trueType,
    typeId: id
  };

}
