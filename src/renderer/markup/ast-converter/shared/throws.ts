import { convertJSDocType } from "unwritten:renderer/markup/ast-converter/jsdoc/index";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { getTranslator } from "unwritten:renderer/markup/utils/translations";
import { createInlineTitleNode, createListNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";

import type { Throws } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedThrowsForDocumentation,
  ConvertedThrowsForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertThrowsForDocumentation(ctx: MarkupRenderContexts, throws: Throws): ConvertedThrowsForDocumentation {

  if(throws.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedThrows = convertJSDocNodes(ctx, throws);

  const title = translate("throws", { capitalize: true });
  const anchor = registerAnonymousAnchor(ctx, title);

  return createTitleNode(
    title,
    anchor,
    createListNode(
      ...convertedThrows
    )
  );

}


export function convertThrowsForType(ctx: MarkupRenderContexts, throws: Throws): ConvertedThrowsForType {

  if(throws.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedThrows = throws.map(
    throws => [
      throws.type && convertJSDocType(ctx, throws.type),
      ...convertJSDocNodes(ctx, throws.content)
    ]
  );

  const title = translate("throws", { capitalize: true });
  const anchor = registerAnonymousAnchor(ctx, title);

  return createInlineTitleNode(
    title,
    anchor,
    createListNode(
      ...convertedThrows
    )
  );

}
