import {
  MarkupRenderer,
  RenderedEnumForDocumentation,
  RenderedEnumForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { Enum } from "quickdoks:types:types.js";


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
