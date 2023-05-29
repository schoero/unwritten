import {
  convertTypeForType,
  convertTypeForTypeMultiline
} from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { isMultilineType } from "unwritten:renderer/markup/utils/types.js";

import type { IntersectionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { ConvertedIntersectionType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertIntersectionType(ctx: MarkupRenderContexts, intersectionType: IntersectionType): ConvertedIntersectionType {
  return intersectionType.types.reduce<ASTNodes[]>((astNodes, type, index) => {

    const convertedType = isMultilineType(type)
      ? convertTypeForTypeMultiline(ctx, type)
      : convertTypeForType(ctx, type);

    astNodes.push(convertedType);
    if(index < intersectionType.types.length - 1){
      astNodes.push(" & ");
    }

    return astNodes;

  }, []);
}
