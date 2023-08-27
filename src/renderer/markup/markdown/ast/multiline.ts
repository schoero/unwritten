import { renderEmptyLine } from "unwritten:renderer/markup/markdown/utils/empty-line.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:markdown/index.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode, MultilineNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderMultilineNode(ctx: MarkdownRenderContext, multilineNode: MultilineNode): string {
  return renderMultilineArray(ctx, multilineNode.children);
}

export function renderMultilineArray(ctx: MarkdownRenderContext, children: ASTNode[]) {

  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = renderEmptyLine(ctx);

  const returnValue = children
    .filter(child => child !== "")
    .reduce<string[]>((acc, child) => {

    const renderedNode = renderNode(ctx, child);
    const renderedIndentation = renderIndentation(ctx);

    if(renderedNode === ""){
      return acc;
    }

    // Remove empty line for sibling list nodes
    // const renderedNodeWithoutSiblingEmptyLine = isListNode(child) &&
    //   index !== 0 && children[index - 1] &&
    //   isListNode(children[index - 1]) &&
    //   renderedNode.startsWith(renderedEmptyLine + renderedNewLine)
    //   ? renderedNode.slice(renderedEmptyLine.length)
    //   : renderedNode;

    // Remove empty line if previously rendered node ends with an empty line and the current node starts with an empty line
    const renderedNodeWithoutDoubleEmptyLines = acc.at(-1)?.endsWith(renderedNewLine + renderedEmptyLine) &&
      renderedNode.startsWith(renderedEmptyLine + renderedNewLine)
      ? renderedNode.slice((renderedEmptyLine + renderedNewLine).length)
      : renderedNode;

    // Render indentation for all children except empty lines
    const renderedNodeWithIndentation =
      renderedNodeWithoutDoubleEmptyLines.startsWith(renderedEmptyLine + renderedNewLine) ||
      renderedNodeWithoutDoubleEmptyLines.startsWith(renderedIndentation)
        ? renderedNodeWithoutDoubleEmptyLines
        : `${renderedIndentation}${renderedNodeWithoutDoubleEmptyLines}`;

    acc.push(renderedNodeWithIndentation);

    return acc;

  }, []);

  const joinedReturnValue = returnValue.join(renderedNewLine);

  return joinedReturnValue;

}
