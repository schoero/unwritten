import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { Description } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedDescriptionForDocumentation,
  ConvertedDescriptionForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertDescriptionForDocumentation(ctx: MarkupRenderContexts, description: Description): ConvertedDescriptionForDocumentation {

  const translate = getTranslator(ctx);

  if(description.length === 0){
    return;
  }

  const title = translate("description", { capitalize: true, count: 1 });
  const anchor = registerAnonymousAnchor(ctx, title);

  const children = convertJSDocNodes(ctx, description);

  return createTitleNode(
    title,
    anchor,
    createParagraphNode(...children)
  );

}


export function convertDescriptionForType(ctx: MarkupRenderContexts, description: Description): ConvertedDescriptionForType {
  return spaceBetween(
    ...convertJSDocNodes(ctx, description)
  );
}
