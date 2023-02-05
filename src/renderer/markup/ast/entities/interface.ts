import { getAnchorLink } from "unwritten:renderer/markup/utils/linker.js";
import { renderDescription } from "unwritten:renderer:markup/shared/description.js";
import { renderExample } from "unwritten:renderer:markup/shared/example.js";
import { renderJSDocTags } from "unwritten:renderer:markup/shared/jsdoc-tags.js";
import { renderName } from "unwritten:renderer:markup/shared/name.js";
import { renderPosition } from "unwritten:renderer:markup/shared/position.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";
import { assert } from "unwritten:utils/general.js";

import { renderSignatureForTableOfContents, renderSignaturesForDocumentation } from "./signature.js";

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
  const anchor = getAnchorLink(ctx, interfaceName, iface.id);

  assert(anchor, "Interface anchor must be defined.");

  const jsdocTags = renderJSDocTags(ctx, iface);
  const position = renderPosition(ctx, iface.position);
  const description = renderDescription(ctx, iface.description);
  const example = renderExample(ctx, iface.example);

  const renderedCallSignatureTitles = iface.callSignatures.map(signatureEntity => renderSignatureForTableOfContents(ctx, signatureEntity));
  const renderedConstructSignatureTitles = iface.constructSignatures.map(signatureEntity => renderSignatureForTableOfContents(ctx, signatureEntity));

  const renderedCallSignatures = renderSignaturesForDocumentation(ctx, iface.callSignatures);
  const renderedConstructSignatures = renderSignaturesForDocumentation(ctx, iface.constructSignatures);

  return {
    [anchor]: [
      jsdocTags,
      position,
      description,
      example,
      [renderedCallSignatureTitles],
      [renderedConstructSignatureTitles],
      renderedCallSignatures,
      renderedConstructSignatures
    ]
  };

}
