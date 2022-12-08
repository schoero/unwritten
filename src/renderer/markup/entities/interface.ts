import { MarkupRenderer, RenderedInterfaceForDocumentation } from "quickdoks:renderer:markup/types/renderer.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { Interface } from "quickdoks:types:types.js";

import { renderMemberForDocumentation } from "./member.js";


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
