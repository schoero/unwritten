import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";

import type { UnionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedUnionType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertUnionType(ctx: MarkupRenderContexts, unionType: UnionType): ConvertedUnionType {
  return unionType.types.reduce<ASTNodes[]>((astNodes, type, index) => {
    const convertedType = convertType(ctx, type);
    astNodes.push(convertedType);
    if(index < unionType.types.length - 1){
      astNodes.push(" | ");
    }
    return astNodes;
  }, []);
}
