import { renderDescription } from "quickdoks:renderer/markup/mixins/description.js";
import { renderExample } from "quickdoks:renderer/markup/mixins/example.js";
import { renderJSDocTags } from "quickdoks:renderer/markup/mixins/jsdoc-tags.js";
import { renderPosition } from "quickdoks:renderer/markup/mixins/position.js";
import { renderRemarks } from "quickdoks:renderer/markup/mixins/remarks.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderType } from "./type.js";

import type { TypeAliasEntity } from "quickdoks:compiler/type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedTypeAliasForDocumentation,
  RenderedTypeAliasForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderTypeAliasForTableOfContents(ctx: RenderContext<MarkupRenderer>, typeAlias: TypeAliasEntity): RenderedTypeAliasForTableOfContents {
  const link = renderLink(ctx, typeAlias.name, typeAlias.id);
  return link;
}


export function renderTypeAliasForDocumentation(ctx: RenderContext<MarkupRenderer>, typeAlias: TypeAliasEntity): RenderedTypeAliasForDocumentation {

  const typeAliasName = typeAlias.name;
  const type = renderType(ctx, typeAlias.type);
  const jsdocTags = renderJSDocTags(ctx, typeAlias);
  const position = renderPosition(ctx, typeAlias.position);
  const description = renderDescription(ctx, typeAlias.description);
  const example = renderExample(ctx, typeAlias.example);
  const remarks = renderRemarks(ctx, typeAlias.remarks);

  return {
    [typeAliasName]: [
      jsdocTags,
      position,
      type,
      description,
      remarks,
      example
    ]
  };

}
