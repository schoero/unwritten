import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:markdown/index.js";
import { renderEmptyLine } from "unwritten:renderer:markdown/utils/empty-line.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderSectionNode(ctx: MarkdownRenderContext, sectionNode: SectionNode): string {

  const renderConfig = getRenderConfig(ctx);

  const renderedNode = renderNode(ctx, sectionNode.children);
  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const renderedSeparator = renderConfig.sectionSeparator && ctx.nesting > 2
    ? `${renderConfig.sectionSeparator}${renderedNewLine}`
    : "";

  return renderedNode === ""
    ? renderedNode
    : `${renderedEmptyLine}${renderedNewLine}${renderedSeparator}${renderedNode}`;
}
