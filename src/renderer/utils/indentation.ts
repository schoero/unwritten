import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";


export function renderIndentation(ctx: MarkupRenderContext): string {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.indentation.repeat(ctx.indentation);
}


export function renderWithIndentation(ctx: MarkupRenderContext, renderedNode: string): string {
  const renderedIndentation = renderIndentation(ctx);

  // Keep empty lines empty as they are
  if(renderedNode.trim() === ""){
    return renderedNode;
  }

  return renderedNode.startsWith(renderedIndentation)
    ? renderedNode
    : `${renderedIndentation}${renderedNode}`;
}
