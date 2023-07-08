import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";

import type { IntersectionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedIntersectionTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertIntersectionTypeInline(ctx: MarkupRenderContexts, intersectionType: IntersectionType): ConvertedIntersectionTypeInline {
  return intersectionType.types.reduce<ASTNodes[]>((astNodes, type, index) => {

    const { inlineType, multilineType } = convertType(ctx, type);

    astNodes.push(multilineType ?? inlineType);
    if(index < intersectionType.types.length - 1){
      astNodes.push(" & ");
    }

    return astNodes;

  }, []);
}
