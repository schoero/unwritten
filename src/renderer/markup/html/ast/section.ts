import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSectionNode(ctx: HTMLRenderContext, sectionNode: SectionNode): string {

  const classAttribute = sectionNode.type ? ` class="${sectionNode.type}"` : "";

  const renderedIndentation = renderIndentation(ctx);
  const renderedNewLine = renderNewLine(ctx);
  const renderedOpeningTag = `<section${classAttribute}>`;

  ctx.indentation++;
  const renderedChildren = renderNode(ctx, sectionNode.children);
  ctx.indentation--;

  const renderedClosingTag = "</section>";

  return renderedChildren === ""
    ? ""
    : [
      `${renderedIndentation}${renderedOpeningTag}`,
      renderedChildren,
      `${renderedIndentation}${renderedClosingTag}`
    ].join(renderedNewLine);
}
