import { convertJSDocReference } from "unwritten:renderer/markup/ast-converter/jsdoc/reference.js";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { createInlineTitleNode, createListNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { See } from "unwritten:interpreter/type-definitions/jsdoc";
import type {
  ConvertedSeeTags,
  ConvertedSeeTagsForType
} from "unwritten:renderer/markup/types-definitions/renderer.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertSeeTagsForDocumentation(ctx: MarkupRenderContexts, seeTags: See): ConvertedSeeTags {

  if(seeTags.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedSeeTags = convertJSDocNodes(ctx, seeTags);

  const seeTranslation = translate("see", { capitalize: true });
  const seeAnchor = registerAnonymousAnchor(ctx, seeTranslation);

  return createTitleNode(
    seeTranslation,
    seeAnchor,
    createListNode(
      ...convertedSeeTags
    )
  );

}


export function convertSeeTagsForType(ctx: MarkupRenderContexts, seeTags: See): ConvertedSeeTagsForType {

  if(seeTags.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedSeeTags = seeTags.map(
    see => [
      see.reference && convertJSDocReference(ctx, see.reference),
      ...convertJSDocNodes(ctx, see.content)
    ]
  );

  const title = translate("see", { capitalize: true });
  const anchor = registerAnonymousAnchor(ctx, title);

  return createInlineTitleNode(
    title,
    anchor,
    createListNode(
      ...convertedSeeTags
    )
  );

}
