import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import type { Enum } from "unwritten:compiler:type-definitions/types.d.js";
import type {
  MarkupRenderer,
  RenderedEnumForDocumentation,
  RenderedEnumForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderEnumForTableOfContents(ctx: RenderContext<MarkupRenderer>, enumType: Enum): RenderedEnumForTableOfContents {
  const link = renderLink(ctx, enumType.name, enumType.id);
  return link;
}


export function renderEnumForDocumentation(ctx: RenderContext<MarkupRenderer>, enumType: Enum): RenderedEnumForDocumentation {

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
