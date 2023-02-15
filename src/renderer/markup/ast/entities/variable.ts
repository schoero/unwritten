import { renderType } from "unwritten:renderer/markup/ast/index.js";
import { renderName } from "unwritten:renderer:markup/shared/name.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderDescription } from "../../shared/description.js";
import { renderExample } from "../../shared/example.js";
import { renderJSDocTags } from "../../shared/jsdoc-tags.js";
import { renderPosition } from "../../shared/position.js";
import { renderRemarks } from "../../shared/remarks.js";

import type { VariableEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedVariableForDocumentation,
  RenderedVariableForTableOfContents
} from "unwritten:renderer/markup/types-definitions/markup.d.js";


export function renderVariableForTableOfContents(ctx: MarkupRenderContext, variable: VariableEntity): RenderedVariableForTableOfContents {
  const link = renderLink(ctx, variable.name, variable.id);
  return link;
}


export function renderVariableForDocumentation(ctx: MarkupRenderContext, variable: VariableEntity): RenderedVariableForDocumentation {

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
