import { renderType } from "quickdoks:renderer/markup/entry-points/types.js";
import { renderName } from "quickdoks:renderer/markup/mixins/name.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderDescription } from "../../mixins/description.js";
import { renderExample } from "../../mixins/example.js";
import { renderJSDocTags } from "../../mixins/jsdoc-tags.js";
import { renderPosition } from "../../mixins/position.js";
import { renderRemarks } from "../../mixins/remarks.js";

import type { VariableEntity } from "quickdoks:compiler/type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedVariableForDocumentation,
  RenderedVariableForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderVariableForTableOfContents(ctx: RenderContext<MarkupRenderer>, variable: VariableEntity): RenderedVariableForTableOfContents {
  const link = renderLink(ctx, variable.name, variable.id);
  return link;
}


export function renderVariableForDocumentation(ctx: RenderContext<MarkupRenderer>, variable: VariableEntity): RenderedVariableForDocumentation {

  const name = renderName(ctx, variable.name);
  const description = renderDescription(ctx, variable.description);
  const jsdocTags = renderJSDocTags(ctx, variable);
  const position = renderPosition(ctx, variable.position);
  const example = renderExample(ctx, variable.example);
  const remarks = renderRemarks(ctx, variable.remarks);

  const type = `Type: ${renderType(ctx, variable.type)}`;

  return {
    [name]: [
      jsdocTags,
      position,
      type,
      description,
      remarks,
      example
    ]
  };

}
