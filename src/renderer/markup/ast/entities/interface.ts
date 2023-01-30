import { renderDescription } from "quickdoks:renderer/markup/mixins/description.js";
import { renderExample } from "quickdoks:renderer/markup/mixins/example.js";
import { renderJSDocTags } from "quickdoks:renderer/markup/mixins/jsdoc-tags.js";
import { renderName } from "quickdoks:renderer/markup/mixins/name.js";
import { renderPosition } from "quickdoks:renderer/markup/mixins/position.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderSignaturesForDocumentation } from "./signature.js";

import type { InterfaceEntity } from "quickdoks:compiler/type-definitions/entities.js";
import type { MarkupRenderer, RenderedInterfaceForDocumentation } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


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
