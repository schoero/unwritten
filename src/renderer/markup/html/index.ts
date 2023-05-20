/* eslint-disable arrow-body-style */
import { renderSectionNode } from "unwritten:renderer/markup/html/ast/section.js";
import { renderSpanNode } from "unwritten:renderer/markup/html/ast/span.js";
import { minMax } from "unwritten:renderer/markup/utils/renderer.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderListNode } from "unwritten:renderer:html/ast/list.js";
import { convertToMarkupAST } from "unwritten:renderer:markup/ast-converter/index.js";
import { renderAnchorNode } from "unwritten:renderer:markup/html/ast/anchor.js";
import { renderBoldNode } from "unwritten:renderer:markup/html/ast/bold.js";
import { renderItalicNode } from "unwritten:renderer:markup/html/ast/italic.js";
import { renderLinkNode } from "unwritten:renderer:markup/html/ast/link.js";
import { renderParagraphNode } from "unwritten:renderer:markup/html/ast/paragraph.js";
import { renderSmallNode } from "unwritten:renderer:markup/html/ast/small.js";
import { renderStrikethroughNode } from "unwritten:renderer:markup/html/ast/strikethrough.js";
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

import { renderTitleNode } from "./ast/title.js";

import type { ExportableEntities } from "unwritten:interpreter:type-definitions/entities.js";
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

  render: (ctx: RenderContext<Renderer>, entities: ExportableEntities[]) => withVerifiedHTMLRenderContext(ctx, ctx => {
    htmlRenderer.initializeContext(ctx);
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
      return node.map(n => renderNode(ctx, n)).join("");
    } else {
      return node;
    }
  }

}

export default htmlRenderer;
