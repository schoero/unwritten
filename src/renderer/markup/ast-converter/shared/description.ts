import { createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer";

import type { Description } from "unwritten:interpreter:type-definitions/jsdoc";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedDescriptionForDocumentation,
  ConvertedDescriptionForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertDescriptionForDocumentation(ctx: MarkupRenderContext, description: Description): ConvertedDescriptionForDocumentation {

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


export function convertDescriptionForType(ctx: MarkupRenderContext, description: Description): ConvertedDescriptionForType {
  return spaceBetween(
    ...convertJSDocNodes(ctx, description)
  );
}
