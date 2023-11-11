/* eslint-disable arrow-body-style */

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { renderConditionalNode } from "unwritten:renderer/markup/markdown/ast/conditional";
import { renderInlineTitleNode } from "unwritten:renderer/markup/markdown/ast/inline-title";
import { renderMultilineNode } from "unwritten:renderer/markup/markdown/ast/multiline";
import { renderPaddedNode } from "unwritten:renderer/markup/markdown/ast/padded";
import { renderEmptyLine } from "unwritten:renderer/markup/markdown/utils/empty-line";
import { escapeMarkdown } from "unwritten:renderer/markup/markdown/utils/escape";
import {
  createCurrentSourceFile,
  registerAnonymousAnchor,
  setCurrentSourceFile
} from "unwritten:renderer/markup/registry/registry";
import { getDestinationFilePath } from "unwritten:renderer/markup/utils/file";
import { createSectionNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes";
import { capitalize } from "unwritten:renderer/markup/utils/translations";
import { renderWithIndentation } from "unwritten:renderer/utils/indentation";
import { renderNewLine } from "unwritten:renderer/utils/new-line";
import { renderAnchorNode } from "unwritten:renderer:markdown/ast/anchor";
import { renderBoldNode } from "unwritten:renderer:markdown/ast/bold";
import { renderItalicNode } from "unwritten:renderer:markdown/ast/italic";
import { renderLinkNode } from "unwritten:renderer:markdown/ast/link";
import { renderListNode } from "unwritten:renderer:markdown/ast/list";
import { renderParagraphNode } from "unwritten:renderer:markdown/ast/paragraph";
import { renderSectionNode } from "unwritten:renderer:markdown/ast/section";
import { renderSmallNode } from "unwritten:renderer:markdown/ast/small";
import { renderSpanNode } from "unwritten:renderer:markdown/ast/span";
import { renderStrikethroughNode } from "unwritten:renderer:markdown/ast/strikethrough";
import { convertToMarkupAST } from "unwritten:renderer:markup/ast-converter/index";
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
} from "unwritten:renderer:markup/typeguards/renderer";
import { minMax } from "unwritten:renderer:markup/utils/renderer";

import { renderTitleNode } from "./ast/title";

import type { SourceFileEntity } from "unwritten:interpreter/type-definitions/entities";
import type { AnchorTarget } from "unwritten:renderer/markup/registry/registry";
import type { MarkdownRenderContext, MarkdownRenderer } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type { RenderContext } from "unwritten:type-definitions/context";
import type { RenderOutput } from "unwritten:type-definitions/renderer";


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

    ctx.links = [];
    ctx.memberContext = [];

    // Attach getters and setters to context
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

    return sourceFileEntities.reduce<(SourceFileEntity & { documentation: ASTNode[]; tableOfContents: ASTNode; title: string; titleAnchor: AnchorTarget; })[]>((convertedSourceFileEntities, sourceFileEntity) => {

      const destination = getDestinationFilePath(ctx, sourceFileEntities, sourceFileEntity);

      void createCurrentSourceFile(ctx, sourceFileEntity, destination);
      void setCurrentSourceFile(ctx, sourceFileEntity);

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
    } else if(!node){
      return "";
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
  const renderedEmptyLine = renderEmptyLine(ctx);

  // escape markdown before splitting to allow catching code fences
  const escapedMarkdown = escapeMarkdown(node);
  const escapedLines = escapedMarkdown.split("\n");

  if(escapedLines.length === 1){
    return escapedLines[0];
  }

  // correct user provided markdown
  return escapedLines.reduce<{ insideCodeFence: boolean; lines: string[]; }>((acc, line, index, arr) => {

    const previousLine = arr[index - 1] as string | undefined;
    const nextLine = arr[index + 1] as string | undefined;

    const isCodeFence = line.startsWith("```");
    const previousLineIsEmptyLine = previousLine?.trim() === "";
    const nextLineIsEmptyLine = nextLine?.trim() === "";

    // ensure code fences are surrounded by empty lines
    if(isCodeFence && !acc.insideCodeFence && !previousLineIsEmptyLine){
      acc.lines.push(renderedEmptyLine);
    }

    // filter out multiple empty lines
    if(line.trim() === "" && previousLineIsEmptyLine){
      return acc;
    }

    if(!acc.insideCodeFence && line.trim() === ""){
      // replace empty lines with proper empty lines outside of code fences
      acc.lines.push(renderedEmptyLine);
    } else if(acc.lines.length === 0){
      // don't indent the first line because it will get indented by the parent node
      acc.lines.push(line);
    } else {
      acc.lines.push(renderWithIndentation(ctx, line));
    }

    // ensure code fences are surrounded by empty lines
    if(isCodeFence && acc.insideCodeFence && !nextLineIsEmptyLine){
      acc.lines.push(renderedEmptyLine);
    }

    if(isCodeFence){
      acc.insideCodeFence = !acc.insideCodeFence;
    }

    return acc;

  }, { insideCodeFence: false, lines: [] as string[] })
    .lines
    .join(renderedNewLine);

}

export default markdownRenderer;
