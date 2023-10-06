import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import {
  createInlineTitleNode,
  createListNode,
  createMultilineNode,
  createParagraphNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";

import type { Throws } from "unwritten:interpreter:type-definitions/shared.js";
import type { ASTNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedThrowsForDocumentation,
  ConvertedThrowsForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertThrowsForDocumentation(ctx: MarkupRenderContexts, throws: Throws): ConvertedThrowsForDocumentation {

  if(!throws || throws.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedThrows = throws.map(throws => {

    if(throws.type){
      const { inlineType, multilineType } = convertType(ctx, throws.type);
      return [
        spaceBetween(
          inlineType,
          throws.description
        ),
        multilineType
      ];
    }

    return throws.description;

  }).filter(node => !!node) as ASTNode[];

  const title = translate("throws", { capitalize: true, count: 1 });
  const anchor = registerAnonymousAnchor(ctx, title);

  return createTitleNode(
    title,
    anchor,
    createListNode(convertedThrows)
  );

}


export function convertThrowsForType(ctx: MarkupRenderContexts, throws: Throws): ConvertedThrowsForType {

  if(!throws || throws.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedThrows = throws.map(throws => {

    if(throws.type){
      const { inlineType, multilineType } = convertType(ctx, throws.type);
      return createMultilineNode(
        createParagraphNode(
          spaceBetween(
            inlineType,
            throws.description
          )
        ),
        multilineType
      );
    }

    return throws.description;

  }).filter(node => !!node) as ASTNode[];

  const title = translate("throws", { capitalize: true });
  const anchor = registerAnonymousAnchor(ctx, title);


  return createInlineTitleNode(
    title,
    anchor,
    createListNode(...convertedThrows)
  );

}
