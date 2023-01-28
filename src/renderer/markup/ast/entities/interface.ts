import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderMemberForDocumentation } from "./member.js";

import type { Interface } from "quickdoks:compiler:type-definitions/types.d.js";
import type { MarkupRenderer, RenderedInterfaceForDocumentation } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderInterfaceForTableOfContents(ctx: RenderContext<MarkupRenderer>, iface: Interface) {
  return renderLink(ctx, iface.name, iface.id);
}


export function renderInterfaceForDocumentation(ctx: RenderContext<MarkupRenderer>, iface: Interface): RenderedInterfaceForDocumentation {

  const interfaceName = iface.name;
  const description = iface.description;
  const example = iface.example;
  const members = iface.members.map(member => renderMemberForDocumentation(ctx, member));

  return {
    [interfaceName]: [
      description,
      example,
      [members]
    ]
  };

}
