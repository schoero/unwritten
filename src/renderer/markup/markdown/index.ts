/* eslint-disable arrow-body-style */

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderConditionalNode } from "unwritten:renderer/markup/markdown/ast/conditional.js";
import { renderInlineTitleNode } from "unwritten:renderer/markup/markdown/ast/inline-title.js";
import { renderMultilineNode } from "unwritten:renderer/markup/markdown/ast/multiline.js";
import { renderPaddedNode } from "unwritten:renderer/markup/markdown/ast/padded.js";
import { renderEmptyLine } from "unwritten:renderer/markup/markdown/utils/empty-line.js";
import { escapeMarkdown } from "unwritten:renderer/markup/markdown/utils/escape.js";
import { createCurrentSourceFile, setCurrentSourceFile } from "unwritten:renderer/markup/registry/registry.js";
import { getDestinationFilePath } from "unwritten:renderer/markup/utils/file.js";
import { createSectionNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { capitalize } from "unwritten:renderer/markup/utils/translations.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
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
import type { LinkRegistry, SourceFile } from "unwritten:renderer/markup/registry/registry.js";
import type { MarkdownRenderContext, MarkdownRenderer } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { RenderOutput } from "unwritten:type-definitions/renderer.js";


export function isMarkdownRenderContext(ctx: RenderContext): ctx is MarkdownRenderContext {
  return ctx.renderer.name === BuiltInRenderers.Markdown;
}

function verifyMarkdownRenderContext(ctx: RenderContext): asserts ctx is MarkdownRenderContext {
  if(ctx.renderer.name !== BuiltInRenderers.Markdown){
    throw new Error(`Renderer '${ctx.renderer.name}' is not a markdown renderer.`);
  }
}

function withVerifiedMarkdownRenderContext(ctx: RenderContext, callback: (ctx: MarkdownRenderContext) => any) {
  verifyMarkdownRenderContext(ctx);
  return callback(ctx);
}


const markdownRenderer: MarkdownRenderer = {

  fileExtension: ".md",
  name: BuiltInRenderers.Markdown,


  // eslint-disable-next-line sort-keys/sort-keys-fix
  initializeContext: (ctx: MarkdownRenderContext) => {

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
      ctx._nesting = 1;
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
      ctx._indentation = 0;
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

  render: (ctx: RenderContext, sourceFileEntities: SourceFileEntity[]) => withVerifiedMarkdownRenderContext(ctx, ctx => {

    const { getFileName } = ctx.dependencies.path;

    const renderedNewLine = renderNewLine(ctx);
    const renderedEmptyLine = renderEmptyLine(ctx);

    markdownRenderer.initializeContext(ctx);

    return sourceFileEntities.reduce<(SourceFileEntity & { documentation: ASTNode[]; tableOfContents: ASTNode; })[]>((convertedSourceFileEntities, sourceFileEntity) => {

      const destination = getDestinationFilePath(ctx, sourceFileEntities, sourceFileEntity);
      createCurrentSourceFile(ctx, sourceFileEntity, destination);
      setCurrentSourceFile(ctx, sourceFileEntity);

      convertedSourceFileEntities.push({
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
        capitalize(getFileName(convertedSourceFileEntity.name, false)),
        createSectionNode("table-of-contents", convertedSourceFileEntity.tableOfContents),
        createSectionNode("documentation", ...convertedSourceFileEntity.documentation)
      );

      const renderedContent = renderNode(ctx, ast);

      const renderedContendWithoutTrailingEmptyLines = renderedContent.endsWith(renderedNewLine + renderedEmptyLine)
        ? renderedContent.slice(0, -(renderedNewLine.length + renderedEmptyLine.length))
        : renderedContent;

      const renderedContentWithTrailingNewLine = renderedContendWithoutTrailingEmptyLines.endsWith(renderedNewLine)
        ? renderedContendWithoutTrailingEmptyLines
        : `${renderedContendWithoutTrailingEmptyLines}${renderedNewLine}`;

      const filePath = ctx.currentFile.dst;

      files[filePath] = renderedContentWithTrailingNewLine;
      return files;

    }, {});

  })

};

export function renderNode(ctx: MarkdownRenderContext, node: ASTNode): string {

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
      return renderArray(ctx, node);
    } else {
      return renderString(ctx, node);
    }
  }

}

function renderArray(ctx: MarkdownRenderContext, node: ASTNode[]): string {
  return node.map(subNode => renderNode(ctx, subNode)).join("");
}

function renderString(ctx: MarkdownRenderContext, node: string): string {

  const renderedNewLine = renderNewLine(ctx);
  const renderedIndentation = renderIndentation(ctx);

  // Escape markdown before splitting to allow catching code fences
  const escapedMarkdown = escapeMarkdown(node);
  const escapedLines = escapedMarkdown.split("\n");

  if(escapedLines.length === 1){
    return escapedLines[0];
  }

  // Indent all lines except the first one
  const indentedLines = escapedLines
    .filter(node => !!node)
    .map((line, index) =>
      index === 0
        ? line
        : `${renderedIndentation}${line}`);

  return indentedLines.join(renderedNewLine);

}

export default markdownRenderer;
