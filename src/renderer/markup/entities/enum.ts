import { RenderContext } from "../../../types/context.js";
import { Enum } from "../../../types/types.js";
import { MarkupRenderer, RenderedEnumForDocumentation, RenderedEnumForTableOfContents } from "../types/renderer.js";
import { renderLink } from "../utils/renderer.js";


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
