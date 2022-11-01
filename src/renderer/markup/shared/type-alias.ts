import { RenderContext } from "../../../types/context.js";
import { TypeAlias } from "../../../types/types.js";
import {
  MarkupRenderer,
  RenderedTypeAliasForDocumentation,
  RenderedTypeAliasForTableOfContents
} from "../types/renderer.js";
import { renderLink } from "../utils/renderer.js";
import { renderType } from "./type.js";


export function renderTypeAliasForTableOfContents(ctx: RenderContext<MarkupRenderer>, typeAlias: TypeAlias): RenderedTypeAliasForTableOfContents {
  const link = renderLink(ctx, typeAlias.name, typeAlias.id);
  return link;
}


export function renderTypeAliasForDocumentation(ctx: RenderContext<MarkupRenderer>, typeAlias: TypeAlias): RenderedTypeAliasForDocumentation {

  const typeAliasName = typeAlias.name;
  const type = renderType(ctx, typeAlias.type);
  const description = typeAlias.description;

  return {
    [typeAliasName]: [
      description,
      type
    ]
  };

}
