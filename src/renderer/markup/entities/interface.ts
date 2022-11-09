import { RenderContext } from "../../../types/context.js";
import { Interface } from "../../../types/types.js";
import { MarkupRenderer, RenderedInterfaceForDocumentation } from "../types/renderer.js";
import { renderLink } from "../utils/renderer.js";
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
