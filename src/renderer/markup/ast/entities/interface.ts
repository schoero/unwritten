import { getAnchorIdentifier } from "unwritten:renderer/markup/utils/linker.js";
import { renderDescription } from "unwritten:renderer:markup/shared/description.js";
import { renderExample } from "unwritten:renderer:markup/shared/example.js";
import { renderJSDocTags } from "unwritten:renderer:markup/shared/jsdoc-tags.js";
import { renderPosition } from "unwritten:renderer:markup/shared/position.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderSignatureForDocumentation, renderSignatureForTableOfContents } from "./signature.js";

import type { InterfaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup.d.js";


export function renderInterfaceForTableOfContents(ctx: MarkupRenderContext, iface: InterfaceEntity) {
  return renderLink(ctx, iface.name, iface.id);
}


export function renderInterfaceForDocumentation(ctx: MarkupRenderContext, iface: InterfaceEntity): RenderedInterfaceForDocumentation {

  const interfaceName = iface.name;
  const anchorIdentifier = getAnchorIdentifier(ctx, interfaceName, iface.id);

  const jsdocTags = renderJSDocTags(ctx, iface);
  const position = renderPosition(ctx, iface.position);
  const description = renderDescription(ctx, iface.description);
  const example = renderExample(ctx, iface.example);

  const renderedCallSignatureTitles = iface.callSignatures.map(signatureEntity => renderSignatureForTableOfContents(ctx, signatureEntity));
  const renderedConstructSignatureTitles = iface.constructSignatures.map(signatureEntity => renderSignatureForTableOfContents(ctx, signatureEntity));

  const renderedCallSignatures = iface.callSignatures.map(signatureEntity => renderSignatureForDocumentation(ctx, signatureEntity));
  const renderedConstructSignatures = iface.constructSignatures.map(signatureEntity => renderSignatureForDocumentation(ctx, signatureEntity));

  return {
    [anchorIdentifier]: [
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
