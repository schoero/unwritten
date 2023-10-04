/* eslint-disable arrow-body-style */
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderConditionalNode } from "unwritten:renderer/markup/html/ast/conditional.js";
import { renderInlineTitleNode } from "unwritten:renderer/markup/html/ast/inline-title.js";
import { renderMultilineNode } from "unwritten:renderer/markup/html/ast/multiline.js";
import { renderPaddedNode } from "unwritten:renderer/markup/html/ast/padded.js";
import {
  createCurrentSourceFile,
  registerAnonymousAnchor,
  setCurrentSourceFile
} from "unwritten:renderer/markup/registry/registry.js";
import { getDestinationFilePath } from "unwritten:renderer/markup/utils/file.js";
import { createSectionNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { capitalize } from "unwritten:renderer/markup/utils/translations.js";
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
  isConditionalNode,
  isInlineTitleNode,
  isItalicNode,
  isLinkNode,
  isListNode,
  isMultilineNode,
  isPaddedNode,
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
import type { AnchorTarget, LinkRegistry, SourceFile } from "unwritten:renderer/markup/registry/registry.js";
import type { HTMLRenderContext, HTMLRenderer } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { RenderOutput } from "unwritten:type-definitions/renderer.js";


export function isHTMLRenderContext(ctx: RenderContext): ctx is HTMLRenderContext {
  return ctx.renderer.name === BuiltInRenderers.HTML;
}

function verifyHTMLRenderContext(ctx: RenderContext): asserts ctx is HTMLRenderContext {
  if(ctx.renderer.name !== BuiltInRenderers.HTML){
    throw new Error(`Renderer '${ctx.renderer.name}' is not a HTML renderer.`);
  }
}

function withVerifiedHTMLRenderContext(ctx: RenderContext, callback: (ctx: HTMLRenderContext) => any) {
  verifyHTMLRenderContext(ctx);
  return callback(ctx);
}


const htmlRenderer: HTMLRenderer = {

  fileExtension: ".html",
  name: BuiltInRenderers.HTML,

  // eslint-disable-next-line sort-keys/sort-keys-fix
  initializeContext: (ctx: HTMLRenderContext) => {

    // Attach getters and setters to context
    if(Object.hasOwn(ctx, "currentFile")){
      ctx._currentFile = ctx.currentFile;
    } else {
      Object.defineProperty(ctx, "currentFile", {
        get() {
          return ctx._currentFile ?? undefined;
        },
        set(currentFile: SourceFile) {
          ctx._currentFile = currentFile;
        }
      });
    }

    if(Object.hasOwn(ctx, "links")){
      ctx._links = ctx.links;
    } else {
      Object.defineProperty(ctx, "links", {
        get() {
          return ctx._links ?? [];
        },
        set(links: LinkRegistry) {
          ctx._links = links;
        }
      });
    }

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

  render: (ctx: RenderContext, sourceFileEntities: SourceFileEntity[]) => withVerifiedHTMLRenderContext(ctx, ctx => {

    const { getFileName } = ctx.dependencies.path;

    htmlRenderer.initializeContext(ctx);

    return sourceFileEntities.reduce<(SourceFileEntity & { documentation: ASTNode[]; tableOfContents: ASTNode; title: string; titleAnchor: AnchorTarget; })[]>((convertedSourceFileEntities, sourceFileEntity) => {

      const destination = getDestinationFilePath(ctx, sourceFileEntities, sourceFileEntity);

      createCurrentSourceFile(ctx, sourceFileEntity, destination);
      setCurrentSourceFile(ctx, sourceFileEntity);

      const title = capitalize(getFileName(sourceFileEntity.name, false));
      const titleAnchor = registerAnonymousAnchor(ctx, title);

      convertedSourceFileEntities.push({
        title,
        titleAnchor,
        ...sourceFileEntity,
        ...convertToMarkupAST(ctx, sourceFileEntity.exports)
      });

      return convertedSourceFileEntities;

    }, [])
      .reduce<RenderOutput>((files, convertedSourceFileEntity) => {

      // Reset context
      ctx.nesting = 1;
      ctx.indentation = 0;

      setCurrentSourceFile(ctx, convertedSourceFileEntity);

      const ast = createTitleNode(
        convertedSourceFileEntity.title,
        convertedSourceFileEntity.titleAnchor,
        createSectionNode("table-of-contents", convertedSourceFileEntity.tableOfContents),
        createSectionNode("documentation", ...convertedSourceFileEntity.documentation)
      );

      const renderedNewLine = renderNewLine(ctx);
      const renderedContent = renderNode(ctx, ast);
      const filePath = ctx.currentFile.dst;

      files[filePath] = `${renderedContent}${renderedNewLine}`;
      return files;

    }, {});

  })

};

export function renderNode(ctx: HTMLRenderContext, node: ASTNode): string {

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
  } else if(isConditionalNode(node)){
    return renderConditionalNode(ctx, node);
  } else if(isMultilineNode(node)){
    return renderMultilineNode(ctx, node);
  } else if(isInlineTitleNode(node)){
    return renderInlineTitleNode(ctx, node);
  } else if(isPaddedNode(node)){
    return renderPaddedNode(ctx, node);
  } else {
    if(Array.isArray(node)){
      return node.map(subNode => renderNode(ctx, subNode)).join("");
    } else {
      return node;
    }
  }

}

export default htmlRenderer;
