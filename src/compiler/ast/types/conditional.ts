import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { parseTypeNode } from "unwritten:compiler:ast/index.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";

import type { ConditionalType as TSConditionalType } from "typescript";

import type { ConditionalType } from "unwritten:compiler:type-definitions/types.d.js";
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
