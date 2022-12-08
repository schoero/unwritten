import { ConditionalType as TSConditionalType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { ConditionalType, Kind } from "quickdoks:types:types.js";


export function createConditionalType(ctx: CompilerContext, type: TSConditionalType): ConditionalType {

  const root = type.root;
  const id = getIdByType(ctx, type);
  const checkType = parseTypeNode(ctx, root.node.checkType);
  const extendsType = parseTypeNode(ctx, root.node.extendsType);
  const trueType = parseTypeNode(ctx, root.node.trueType);
  const falseType = parseTypeNode(ctx, root.node.falseType);

  const kind = Kind.ConditionalType;

  return {
    checkType,
    extendsType,
    falseType,
    id,
    kind,
    trueType
  };

}
