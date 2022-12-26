import {
  MarkupRenderer,
  RenderedMemberForDocumentation,
  RenderedMemberForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import { getRenderConfig } from "quickdoks:renderer:markup/utils/config.js";
import { encapsulate, renderLink, spaceBetween } from "quickdoks:renderer:markup/utils/renderer.js";

import { RenderContext } from "quickdoks:type-definitions/context.d.js";
import { EnumMember, Member } from "quickdoks:type-definitions/types.d.js";

import { renderType } from "./type.js";


export function renderMemberForTableOfContents(ctx: RenderContext<MarkupRenderer>, member: EnumMember | Member): RenderedMemberForTableOfContents {
  return renderLink(ctx, member.name, member.id);
}


export function renderMemberForDocumentation(ctx: RenderContext<MarkupRenderer>, member: EnumMember | Member): RenderedMemberForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = member.description ? member.description : "";
  const name = encapsulate(member.name, renderConfig.propertyEncapsulation);
  const type = `${renderType(ctx, member.valueType)}`;
  const optional = "optional" in member && member.optional === true
    ? encapsulate("optional", renderConfig.tagEncapsulation)
    : "";

  return `${name}: ${spaceBetween(type, description, optional)}`;

}
