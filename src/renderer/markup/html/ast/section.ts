import { withIndentation } from "unwritten:renderer/markup/utils/context.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderNode } from "unwritten:renderer:html/index.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { SectionType } from "unwritten:renderer:markup/types-definitions/sections.js";


export function renderSectionNode(ctx: HTMLRenderContext, sectionNode: SectionNode): string {

  const tag = getTag(ctx, sectionNode.type);
  const classAttribute = sectionNode.type ? ` class="${sectionNode.type}"` : "";

  const renderedIndentation = renderIndentation(ctx);
  const renderedNewLine = renderNewLine(ctx);
  const renderedOpeningTag = `<${tag}${classAttribute}>`;
  const renderedChildren = withIndentation(ctx, ctx => renderNode(ctx, sectionNode.children));
  const renderedClosingTag = `</${tag}>`;

  return renderedChildren === ""
    ? ""
    : [
      `${renderedIndentation}${renderedOpeningTag}`,
      renderedChildren,
      `${renderedIndentation}${renderedClosingTag}`
    ].join(renderedNewLine);
}

function getTag(ctx: HTMLRenderContext, type?: SectionType) {

  const renderConfig = getRenderConfig(ctx);

  switch (type){
    case SECTION_TYPE.tableOfContents: {
      return renderConfig.sidebar ? "aside" : "nav";
    }
    case SECTION_TYPE.documentation: {
      return "main";
    }
    default: {
      return "section";
    }
  }

}
