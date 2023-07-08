import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";

import type { UnionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedUnionTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertUnionTypeInline(ctx: MarkupRenderContexts, unionType: UnionType): ConvertedUnionTypeInline {
  return unionType.types.reduce<ASTNodes[]>((astNodes, type, index) => {

    const { inlineType, multilineType } = convertType(ctx, type);
    const convertedType = multilineType ?? inlineType;

    astNodes.push(convertedType);
    if(index < unionType.types.length - 1){
      astNodes.push(" | ");
    }

    return astNodes;

  }, []);
}
