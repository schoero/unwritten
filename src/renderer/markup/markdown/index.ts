/* eslint-disable arrow-body-style */
import { renderSpanNode } from "unwritten:renderer/markup/markdown/ast/span.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderListNode } from "unwritten:renderer:markdown/ast/list.js";
import { convertToMarkupAST } from "unwritten:renderer:markup/ast-converter/index.js";
import { renderAnchorNode } from "unwritten:renderer:markup/markdown/ast/anchor.js";
import { renderBoldNode } from "unwritten:renderer:markup/markdown/ast/bold.js";
import { renderItalicNode } from "unwritten:renderer:markup/markdown/ast/italic.js";
import { renderLinkNode } from "unwritten:renderer:markup/markdown/ast/link.js";
import { renderParagraphNode } from "unwritten:renderer:markup/markdown/ast/paragraph.js";
import { renderSmallNode } from "unwritten:renderer:markup/markdown/ast/small.js";
import { renderStrikethroughNode } from "unwritten:renderer:markup/markdown/ast/strikethrough.js";
import {
  isAnchorNode,
  isBoldNode,
  isItalicNode,
  isLinkNode,
  isListNode,
  isParagraphNode,
  isSmallNode,
  isSpanNode,
  isStrikethroughNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";

import { renderTitleNode } from "./ast/title.js";

import type { ExportableEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkdownRenderContext, MarkdownRenderer } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export function isMarkdownRenderContext(ctx: RenderContext<Renderer>): ctx is MarkdownRenderContext {
  return ctx.renderer.name === BuiltInRenderers.Markdown;
}

function verifyMarkdownRenderContext(ctx: RenderContext<Renderer>): asserts ctx is MarkdownRenderContext {
  if(ctx.renderer.name !== BuiltInRenderers.Markdown){
    throw new Error(`Renderer '${ctx.renderer.name}' is not a markdown renderer.`);
  }
}

function withVerifiedMarkdownRenderContext(ctx: RenderContext<Renderer>, callback: (ctx: MarkdownRenderContext) => string) {
  verifyMarkdownRenderContext(ctx);
  return callback(ctx);
}


const markdownRenderer: MarkdownRenderer = {

  fileExtension: ".md",
  name: BuiltInRenderers.Markdown,

  render: (ctx: RenderContext<Renderer>, entities: ExportableEntities[]) => withVerifiedMarkdownRenderContext(ctx, ctx => {

    ctx.indentation = 0;
    ctx.size = 1;

    const markupAST = convertToMarkupAST(ctx, entities);

    return renderNode(ctx, markupAST);

  })

};

export function renderNode(ctx: MarkdownRenderContext, node: ASTNodes): string {

  if(isLinkNode(node)){
    return renderLinkNode(ctx, node);
  } else if(isParagraphNode(node)){
    return renderParagraphNode(ctx, node);
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
  } else if(isSpanNode(node)){
    return renderSpanNode(ctx, node);
  } else {
    if(Array.isArray(node)){
      return node.map(n => renderNode(ctx, n)).join("");
    } else {
      return node;
    }
  }

}

export default markdownRenderer;
