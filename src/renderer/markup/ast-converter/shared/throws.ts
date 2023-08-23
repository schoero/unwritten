import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { createListNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { Throws } from "unwritten:interpreter:type-definitions/shared.js";
import type { ASTNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedThrows } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertThrows(ctx: MarkupRenderContexts, throws: Throws): ConvertedThrows {

  if(!throws || throws.length === 0){
    return "";
  }

  const convertedThrows = throws.map(throws => {

    if(throws.type){
      const { inlineType, multilineType } = convertType(ctx, throws.type);
      return [
        spaceBetween(
          inlineType,
          throws.description ?? ""
        ),
        multilineType ?? ""
      ];
    }

    return throws.description;

  }).filter(node => !!node) as ASTNode[];

  return createTitleNode(
    "Throws",
    createListNode(convertedThrows)
  );

}
