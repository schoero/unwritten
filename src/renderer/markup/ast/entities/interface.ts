import { renderDescription } from "unwritten:renderer:markup/shared/description.js";
import { renderExample } from "unwritten:renderer:markup/shared/example.js";
import { renderJSDocTags } from "unwritten:renderer:markup/shared/jsdoc-tags.js";
import { renderName } from "unwritten:renderer:markup/shared/name.js";
import { renderPosition } from "unwritten:renderer:markup/shared/position.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";
import { convertTitlesToList } from "unwritten:renderer:utils/utils.js";

import { renderSignaturesForDocumentation } from "./signature.js";

import type { InterfaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedInterfaceForDocumentation
} from "unwritten:renderer:markup/types/renderer.js";


export function renderInterfaceForTableOfContents(ctx: MarkupRenderContext, iface: InterfaceEntity) {
  return renderLink(ctx, iface.name, iface.id);
}


export function renderInterfaceForDocumentation(ctx: MarkupRenderContext, iface: InterfaceEntity): RenderedInterfaceForDocumentation {

  const interfaceName = renderName(ctx, iface.name);
  const jsdocTags = renderJSDocTags(ctx, iface);
  const position = renderPosition(ctx, iface.position);
  const description = renderDescription(ctx, iface.description);
  const example = renderExample(ctx, iface.example);

  const renderedCallSignatures = convertTitlesToList(renderSignaturesForDocumentation(ctx, iface.callSignatures));
  const renderedConstructSignatures = convertTitlesToList(renderSignaturesForDocumentation(ctx, iface.constructSignatures));

  return {
    [interfaceName]: [
      jsdocTags,
      position,
      description,
      example,
      renderedConstructSignatures,
      renderedCallSignatures
    ]
  };

}
