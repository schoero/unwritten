/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderAnchorNode } from "unwritten:renderer:html/ast/anchor.js";
import { renderBoldNode } from "unwritten:renderer:html/ast/bold.js";
import { renderItalicNode } from "unwritten:renderer:html/ast/italic.js";
import { renderLinkNode } from "unwritten:renderer:html/ast/link.js";
import { renderListNode } from "unwritten:renderer:html/ast/list.js";
import { renderParagraphNode } from "unwritten:renderer:html/ast/paragraph.js";
import { renderSectionNode } from "unwritten:renderer:html/ast/section.js";
import { renderSmallNode } from "unwritten:renderer:html/ast/small.js";
import { renderSpanNode } from "unwritten:renderer:html/ast/span.js";
import { renderStrikethroughNode } from "unwritten:renderer:html/ast/strikethrough.js";
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
import type { HTMLRenderContext, HTMLRenderer } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export function isHTMLRenderContext(ctx: RenderContext<Renderer>): ctx is HTMLRenderContext {
  return ctx.renderer.name === BuiltInRenderers.HTML;
}

function verifyHTMLRenderContext(ctx: RenderContext<Renderer>): asserts ctx is HTMLRenderContext {
  if(ctx.renderer.name !== BuiltInRenderers.HTML){
    throw new Error(`Renderer '${ctx.renderer.name}' is not a HTML renderer.`);
  }
}

function withVerifiedHTMLRenderContext(ctx: RenderContext<Renderer>, callback: (ctx: HTMLRenderContext) => string) {
  verifyHTMLRenderContext(ctx);
  return callback(ctx);
}


const htmlRenderer: HTMLRenderer = {

  fileExtension: ".html",
  name: BuiltInRenderers.HTML,
  // eslint-disable-next-line sort-keys/sort-keys-fix
  exportRegistry: new Set(),
  linkRegistry: new Map(),

  render: (ctx: RenderContext<Renderer>, entities: ExportableEntity[]) => withVerifiedHTMLRenderContext(ctx, ctx => {

    htmlRenderer.initializeContext(ctx);
    htmlRenderer.initializeExportRegistry(ctx, entities);

    const markupAST = convertToMarkupAST(ctx, entities);

    return renderNode(ctx, markupAST);

  }),


  // eslint-disable-next-line sort-keys/sort-keys-fix
  initializeContext: (ctx: HTMLRenderContext) => {

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

  initializeExportRegistry: (ctx: HTMLRenderContext, entities: ExportableEntity[]) => {
    createExportRegistry(ctx, entities);
  }


};

export function renderNode(ctx: HTMLRenderContext, node: ASTNodes): string {

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

        return index > 0 && (isListNode(n) || isTitleNode(n) || isParagraphNode(n))
          ? `${renderNewLine(ctx)}${renderedNode}`
          : renderedNode;

      }).join("");
    } else {
      return node;
    }
  }

}

export default htmlRenderer;
