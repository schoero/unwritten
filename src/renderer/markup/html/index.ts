/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { initializeRegistry } from "unwritten:renderer/markup/registry/registry.js";
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
import { minMax } from "unwritten:renderer:markup/utils/renderer.js";

import { renderTitleNode } from "./ast/title.js";

import type { SourceFileEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { HTMLRenderContext, HTMLRenderer } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer, RenderOutput } from "unwritten:type-definitions/renderer.js";


export function isHTMLRenderContext(ctx: RenderContext<Renderer>): ctx is HTMLRenderContext {
  return ctx.renderer.name === BuiltInRenderers.HTML;
}

function verifyHTMLRenderContext(ctx: RenderContext<Renderer>): asserts ctx is HTMLRenderContext {
  if(ctx.renderer.name !== BuiltInRenderers.HTML){
    throw new Error(`Renderer '${ctx.renderer.name}' is not a HTML renderer.`);
  }
}

function withVerifiedHTMLRenderContext(ctx: RenderContext<Renderer>, callback: (ctx: HTMLRenderContext) => any) {
  verifyHTMLRenderContext(ctx);
  return callback(ctx);
}


const htmlRenderer: HTMLRenderer = {

  fileExtension: ".html",
  name: BuiltInRenderers.HTML,

  // eslint-disable-next-line sort-keys/sort-keys-fix
  initializeContext: (ctx: HTMLRenderContext) => {

    if(Object.hasOwn(ctx, "nesting")){
      ctx._nesting = ctx.nesting;
    } else {
      Object.defineProperty(ctx, "nesting", {
        get() {
          return minMax(ctx._nesting ?? 1, 1, 6);
        },
        set(level: number) {
          ctx._nesting = level;
        }
      });
    }

    if(Object.hasOwn(ctx, "indentation")){
      ctx._indentation = ctx.indentation;
    } else {
      Object.defineProperty(ctx, "indentation", {
        get() {
          return minMax(ctx._indentation ?? 0, 0, Infinity);
        },
        set(level: number) {
          ctx._indentation = level;
        }
      });
    }

  },

  initializeRegistry: (ctx: HTMLRenderContext, sourceFileEntities: SourceFileEntity[]) => {
    initializeRegistry(ctx, sourceFileEntities);
  },

  render: (ctx: RenderContext<Renderer>, sourceFileEntities: SourceFileEntity[]) => withVerifiedHTMLRenderContext(ctx, ctx => {

    htmlRenderer.initializeRegistry(ctx, sourceFileEntities);
    htmlRenderer.initializeContext(ctx);

    return sourceFileEntities.reduce<RenderOutput>((files, sourceFileEntity) => {

      // Reset context
      ctx.nesting = 1;
      ctx.indentation = 0;
      ctx.currentFile = sourceFileEntity.symbolId;

      const renderedNewLine = renderNewLine(ctx);

      const markupAST = convertToMarkupAST(ctx, sourceFileEntity.exports);
      const renderedContent = renderNode(ctx, markupAST);

      files[sourceFileEntity.name] = `${renderedContent}${renderedNewLine}`;
      return files;

    }, {});

  })


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
