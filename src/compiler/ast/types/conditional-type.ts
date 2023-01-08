import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { ConditionalType as TSConditionalType } from "typescript";

import type { ConditionalType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createConditionalType(ctx: CompilerContext, type: TSConditionalType): ConditionalType {

  const root = type.root;
  const id = getIdByType(ctx, type);
  const checkType = parseTypeNode(ctx, root.node.checkType);
  const extendsType = parseTypeNode(ctx, root.node.extendsType);
  const trueType = parseTypeNode(ctx, root.node.trueType);
  const falseType = parseTypeNode(ctx, root.node.falseType);

  const kind = TypeKind.ConditionalType;

  return {
    checkType,
    extendsType,
    falseType,
    id,
    kind,
    trueType
  };

}
