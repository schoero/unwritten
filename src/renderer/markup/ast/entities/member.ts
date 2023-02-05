import { renderType } from "unwritten:renderer/markup/ast/index.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, renderLink, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { EnumMember, Member } from "unwritten:compiler:type-definitions/types.d.js";
import type {
  MarkupRenderContext,
  RenderedMemberForDocumentation,
  RenderedMemberForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderMemberForTableOfContents(ctx: MarkupRenderContext, member: EnumMember | Member): RenderedMemberForTableOfContents {
  return renderLink(ctx, member.name, member.id);
}


export function renderMemberForDocumentation(ctx: MarkupRenderContext, member: EnumMember | Member): RenderedMemberForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = member.description ? member.description : "";
  const name = encapsulate(member.name, renderConfig.propertyEncapsulation);
  const type = `${renderType(ctx, member.valueType)}`;
  const optional = "optional" in member && member.optional === true
    ? encapsulate("optional", renderConfig.tagEncapsulation)
    : "";

  return `${name}: ${spaceBetween(type, description, optional)}`;

}
