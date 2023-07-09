/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderAnchorNode } from "unwritten:renderer:markdown/ast/anchor.js";
import { renderBoldNode } from "unwritten:renderer:markdown/ast/bold.js";
import { renderItalicNode } from "unwritten:renderer:markdown/ast/italic.js";
import { renderLinkNode } from "unwritten:renderer:markdown/ast/link.js";
import { renderListNode } from "unwritten:renderer:markdown/ast/list.js";
import { renderParagraphNode } from "unwritten:renderer:markdown/ast/paragraph.js";
import { renderSectionNode } from "unwritten:renderer:markdown/ast/section.js";
import { renderSmallNode } from "unwritten:renderer:markdown/ast/small.js";
import { renderSpanNode } from "unwritten:renderer:markdown/ast/span.js";
import { renderStrikethroughNode } from "unwritten:renderer:markdown/ast/strikethrough.js";
import { convertToMarkupAST } from "unwritten:renderer:markup/ast-converter/index.js";
import {
  isAnchorNode,
  isBoldNode,
  isItalicNode,
  isLinkNode,
  isListNode,
  isParagraphNode,
  isSectionNode,
  isSmallNode,
  isSpanNode,
  isStrikethroughNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { createExportRegistry } from "unwritten:renderer:markup/utils/exports.js";
import { minMax } from "unwritten:renderer:markup/utils/renderer.js";

import { renderTitleNode } from "./ast/title.js";

import type { ExportableEntity } from "unwritten:interpreter/type-definitions/entities.js";
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
  // eslint-disable-next-line sort-keys/sort-keys-fix
  exportRegistry: new Set(),
  linkRegistry: new Map(),

  render: (ctx: RenderContext<Renderer>, entities: ExportableEntity[]) => withVerifiedMarkdownRenderContext(ctx, ctx => {

    markdownRenderer.initializeContext(ctx);
    markdownRenderer.initializeExportRegistry(ctx, entities);

    const renderedNewLine = renderNewLine(ctx);

    const markupAST = convertToMarkupAST(ctx, entities);
    const renderedContent = renderNode(ctx, markupAST);

    return `${renderedContent}${renderedNewLine}`;

  }),


  // eslint-disable-next-line sort-keys/sort-keys-fix
  initializeContext: (ctx: MarkdownRenderContext) => {

    Object.defineProperty(ctx, "nesting", {
      get() {
        return minMax(ctx._nesting ?? 1, 1, 6);
      },
      set(level: number) {
        ctx._nesting = level;
      }
    });

    Object.defineProperty(ctx, "indentation", {
      get() {
        return minMax(ctx._indentation ?? 0, 0, Infinity);
      },
      set(level: number) {
        ctx._indentation = level;
      }
    });

  },

  initializeExportRegistry: (ctx: MarkdownRenderContext, entities: ExportableEntity[]) => {
    createExportRegistry(ctx, entities);
  }

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
  } else if(isSectionNode(node)){
    return renderSectionNode(ctx, node);
  } else {
    if(Array.isArray(node)){
      return node.map((n, index) => {

        const renderedNode = renderNode(ctx, n);

        if(renderedNode === ""){
          return "";
        }

        return index > 0 && (isListNode(n) || isTitleNode(n) || isParagraphNode(n) || isSectionNode(n))
          ? `${renderNewLine(ctx)}${renderedNode}`
          : renderedNode;

      }).join("");
    } else {
      return node;
    }
  }

}

export default markdownRenderer;
