import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import type { Enum } from "unwritten:compiler:type-definitions/types.d.js";
import type {
  MarkupRenderContext,
  RenderedEnumForDocumentation,
  RenderedEnumForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderEnumForTableOfContents(ctx: MarkupRenderContext, enumType: Enum): RenderedEnumForTableOfContents {
  const link = renderLink(ctx, enumType.name, enumType.id);
  return link;
}


export function renderEnumForDocumentation(ctx: MarkupRenderContext, enumType: Enum): RenderedEnumForDocumentation {

  const enumName = enumType.name;
  const description = enumType.description;
  const members = enumType.members.map(member => member.name);

  return {
    [enumName]: [
      description,
      [members]
    ]
  };

}
