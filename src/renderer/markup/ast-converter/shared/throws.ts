import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createInlineTitleNode, createListNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { Throws } from "unwritten:interpreter:type-definitions/shared.js";
import type { ASTNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedThrowsForDocumentation,
  ConvertedThrowsForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertThrowsForDocumentation(ctx: MarkupRenderContexts, throws: Throws): ConvertedThrowsForDocumentation {

  if(!throws || throws.length === 0){
    return "";
  }

  const translate = getTranslator(ctx);

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
    translate("throws", { capitalize: true }),
    createListNode(convertedThrows)
  );

}


export function convertThrowsForType(ctx: MarkupRenderContexts, throws: Throws): ConvertedThrowsForType {

  if(!throws || throws.length === 0){
    return "";
  }

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  const title = translate("throws", { capitalize: true });

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

  return createInlineTitleNode(
    title,
    createListNode(convertedThrows)
  );

}
