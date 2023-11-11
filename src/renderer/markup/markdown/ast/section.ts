import { renderMultilineArray } from "unwritten:renderer/markup/markdown/ast/multiline";
import { renderTitle, renderTitleChildren, renderTitleNode } from "unwritten:renderer/markup/markdown/ast/title.js";
import { isSectionNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { renderEmptyLine, startsWithEmptyLine } from "unwritten:renderer:markdown/utils/empty-line";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderSectionNode(ctx: MarkdownRenderContext, sectionNode: SectionNode): string {

  const renderConfig = getRenderConfig(ctx);

  if(!renderConfig.sectionSeparator){
    return renderMultilineArray(
      ctx,
      [
        sectionNode.title,
        ...sectionNode.children
      ]
    );
  }

  const renderedEmptyLine = renderEmptyLine(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const separator = [
    renderedEmptyLine,
    renderConfig.sectionSeparator,
    renderedEmptyLine
  ];
  const renderedSeparator = separator.join(renderedNewLine);

  const renderedSectionChildren = renderMultilineArray(ctx, sectionNode.children);

  // sectionNode > titleNode > [sectionNode, ...] should not render the section separator for the first nested section
  if(sectionNode.title && isSectionNode(sectionNode.title.children[0])){

    const renderedTitleChildren = renderTitleChildren(ctx, sectionNode.title);

    const renderedTitleChildrenBeginsWithSeparator = startsWithEmptyLine(ctx, renderedTitleChildren);
    const renderedTitleChildrenWithoutInitialSectionSeparator = renderedTitleChildrenBeginsWithSeparator
      ? renderedTitleChildren.slice(renderedSeparator.length + 1) // +1 for the new line
      : renderedTitleChildren;

    const renderedTitle = renderTitle(ctx, sectionNode.title);

    const childrenBeginsWithEmptyLine = startsWithEmptyLine(ctx, renderedTitleChildrenWithoutInitialSectionSeparator);
    const trailingEmptyLine = childrenBeginsWithEmptyLine ? "" : renderedEmptyLine;

    const renderedChildren = [
      renderedTitleChildrenWithoutInitialSectionSeparator,
      renderedSectionChildren
    ]
      .filter(renderedNode => !!renderedNode)
      .join(renderedSeparator);

    return [
      renderedSeparator,
      renderedTitle,
      trailingEmptyLine,
      renderedChildren
    ]
      .filter(renderedNode => !!renderedNode)
      .join(renderedNewLine);

  }

  const renderedTitleNode = sectionNode.title
    ? renderTitleNode(ctx, sectionNode.title)
    : "";

  if(renderedTitleNode === "" && renderedSectionChildren === ""){
    return "";
  }

  const sectionChildrenBeginsWithSeparator = startsWithEmptyLine(ctx, renderedSectionChildren);

  if(renderedTitleNode !== ""){

    const renderedChildrenBeginWithEmptyLine = startsWithEmptyLine(ctx, renderedTitleNode);
    const renderedCompensatedSeparator = renderedChildrenBeginWithEmptyLine
      ? separator.slice(0, -1).join(renderedNewLine)
      : separator.join(renderedNewLine);

    return [
      renderedCompensatedSeparator,
      renderedTitleNode,
      renderedSectionChildren
    ]
      .filter(item => !!item)
      .join(renderedNewLine);
  }

  if(renderedSectionChildren !== ""){

    const renderedChildrenBeginWithEmptyLine = startsWithEmptyLine(ctx, renderedSectionChildren);
    const renderedCompensatedSeparator = renderedChildrenBeginWithEmptyLine
      ? separator.slice(0, -1).join(renderedNewLine)
      : separator.join(renderedNewLine);

    return sectionChildrenBeginsWithSeparator
      ? renderedSectionChildren
      : [
        renderedCompensatedSeparator,
        renderedSectionChildren
      ]
        .filter(item => !!item)
        .join(renderedNewLine);
  }

  return "";
}
