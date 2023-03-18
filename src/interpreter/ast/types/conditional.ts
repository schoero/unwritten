import { parseTypeNode } from "unwritten:interpreter/ast/index.js";
import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";

import type { ConditionalType as TSConditionalType } from "typescript";

import type { ConditionalType } from "unwritten:interpreter/type-definitions/types.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createConditionalType(ctx: CompilerContext, type: TSConditionalType): ConditionalType {

  const root = type.root;
  const id = getIdByType(ctx, type);
  const checkType = parseTypeNode(ctx, root.node.checkType);
  const extendsType = parseTypeNode(ctx, root.node.extendsType);
  const trueType = parseTypeNode(ctx, root.node.trueType);
  const falseType = parseTypeNode(ctx, root.node.falseType);

  const kind = TypeKind.Conditional;

  return {
    checkType,
    extendsType,
    falseType,
    id,
    kind,
    trueType
  };

}
