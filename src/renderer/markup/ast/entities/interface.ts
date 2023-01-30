import { renderDescription } from "unwritten:renderer/markup/mixins/description.js";
import { renderExample } from "unwritten:renderer/markup/mixins/example.js";
import { renderJSDocTags } from "unwritten:renderer/markup/mixins/jsdoc-tags.js";
import { renderName } from "unwritten:renderer/markup/mixins/name.js";
import { renderPosition } from "unwritten:renderer/markup/mixins/position.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderSignaturesForDocumentation } from "./signature.js";

import type { InterfaceEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { MarkupRenderer, RenderedInterfaceForDocumentation } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderInterfaceForTableOfContents(ctx: RenderContext<MarkupRenderer>, iface: InterfaceEntity) {
  return renderLink(ctx, iface.name, iface.id);
}


export function renderInterfaceForDocumentation(ctx: RenderContext<MarkupRenderer>, iface: InterfaceEntity): RenderedInterfaceForDocumentation {

  const interfaceName = renderName(ctx, iface.name);
  const jsdocTags = renderJSDocTags(ctx, iface);
  const position = renderPosition(ctx, iface.position);
  const description = renderDescription(ctx, iface.description);
  const example = renderExample(ctx, iface.example);

  const renderedCallSignatures = renderSignaturesForDocumentation(ctx, iface.callSignatures);
  const renderedConstructSignatures = renderSignaturesForDocumentation(ctx, iface.constructSignatures);

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
