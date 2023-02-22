/* eslint-disable arrow-body-style */
import { renderAnchorNode } from "unwritten:renderer/markup/html/ast/anchor.js";
import { renderBoldNode } from "unwritten:renderer/markup/html/ast/bold.js";
import { renderItalicNode } from "unwritten:renderer/markup/html/ast/italic.js";
import { renderLinkNode } from "unwritten:renderer/markup/html/ast/link.js";
import { renderParagraphNode } from "unwritten:renderer/markup/html/ast/paragraph.js";
import { renderSmallNode } from "unwritten:renderer/markup/html/ast/small.js";
import { renderStrikethroughNode } from "unwritten:renderer/markup/html/ast/strikethrough.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderListNode } from "unwritten:renderer:html/ast/list.js";
import { convertToMarkupAST } from "unwritten:renderer:markup/ast-converter/index.js";
import {
  isAnchorNode,
  isBoldNode,
  isContainerNode,
  isItalicNode,
  isLinkNode,
  isListNode,
  isParagraphNode,
  isSmallNode,
  isStrikethroughNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";

import { renderContainerNode } from "./ast/container.js";
import { renderTitleNode } from "./ast/title.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.js";
import type { HTMLRenderContext, HTMLRenderer } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


function verifyRenderer(renderer: Renderer): asserts renderer is HTMLRenderer {
  if(renderer.name !== BuiltInRenderers.HTML){
    throw new Error(`Renderer '${renderer.name}' is not a HTML renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is HTMLRenderContext {
  verifyRenderer(ctx.renderer);
}

const htmlRenderer: HTMLRenderer = {
  fileExtension: ".html",
  name: BuiltInRenderers.HTML,

  render(ctx: RenderContext<Renderer>, entities: ExportableEntities[]) {
    verifyContext(ctx);
    const markupAST = convertToMarkupAST(ctx, entities);
    return renderContainerNode(ctx, markupAST);
  }
};


export function renderNode(ctx: HTMLRenderContext, node: ASTNodes): string {

  if(isLinkNode(node)){
    return renderLinkNode(ctx, node);
  } else if(isParagraphNode(node)){
    return renderParagraphNode(ctx, node);
  } else if(isContainerNode(node)){
    return renderContainerNode(ctx, node);
  } else if(isListNode(node)){
    return renderListNode(ctx, node);
  } else if(isAnchorNode(node)){
    return renderAnchorNode(ctx, node);
  } else if(isSmallNode(node)){
    return renderSmallNode(ctx, node);
  } else if(isBoldNode(node)){
    return renderBoldNode(ctx, node);
  } else if(isItalicNode(node)){
    return renderItalicNode(ctx, node);
  } else if(isStrikethroughNode(node)){
    return renderStrikethroughNode(ctx, node);
  } else if(isTitleNode(node)){
    return renderTitleNode(ctx, node);
  } else {
    if(Array.isArray(node)){
      return node.map(n => renderNode(ctx, n)).join("");
    } else {
      return node;
    }
  }

}

export default htmlRenderer;
