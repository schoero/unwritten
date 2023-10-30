import { renderMultilineArray } from "unwritten:renderer/markup/markdown/ast/multiline";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { renderEmptyLine } from "unwritten:renderer:markdown/utils/empty-line";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes";


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
