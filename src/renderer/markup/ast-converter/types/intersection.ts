import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { createWrapperNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { IntersectionType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { ConvertedIntersectionType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertIntersectionType(ctx: MarkupRenderContexts, intersectionType: IntersectionType): ConvertedIntersectionType {

  const result: ASTNodes[] = [];

  intersectionType.types.map((type, index) => {
    const convertedType = convertType(ctx, type);
    result.push(convertedType);
    if(index < intersectionType.types.length - 1){
      result.push(" & ");
    }
  });

  return createWrapperNode(
    ...result
  );

}
