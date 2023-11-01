import { withIndentation } from "unwritten:renderer/markup/utils/context";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { renderIndentation } from "unwritten:renderer/utils/indentation";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { renderNode } from "unwritten:renderer:html/index";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { SectionNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type { SectionType } from "unwritten:renderer:markup/types-definitions/sections";


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
