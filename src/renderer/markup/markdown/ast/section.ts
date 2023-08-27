import { renderMultilineArray } from "unwritten:renderer/markup/markdown/ast/multiline.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderEmptyLine } from "unwritten:renderer:markdown/utils/empty-line.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSectionNode(ctx: MarkdownRenderContext, sectionNode: SectionNode): string {

  const renderConfig = getRenderConfig(ctx);

  const renderedChildren = renderMultilineArray(ctx, sectionNode.children);
  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const childrenBeginsWithEmptyLine = renderedChildren.startsWith(renderedEmptyLine);
  const trailingEmptyLine = childrenBeginsWithEmptyLine
    ? ""
    : `${renderedEmptyLine}${renderedNewLine}`;

  const renderedSeparator = renderConfig.sectionSeparator && ctx.nesting > 2
    ? [
      renderedEmptyLine,
      renderConfig.sectionSeparator,
      trailingEmptyLine
    ]
      .join(renderedNewLine)
    : "";

  return renderedChildren === ""
    ? renderedChildren
    : `${renderedSeparator}${renderedChildren}`;
}
