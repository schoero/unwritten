import { renderJSDoc } from "unwritten:renderer/typescript/utils/jsdoc.js";
import { renderEntity } from "unwritten:renderer:typescript/ast/index.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";

import type { NamespaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderNamespaceEntity(ctx: TypeScriptRenderContext, namespaceEntity: NamespaceEntity): string {

  const renderedIndentation = renderIndentation(ctx);
  const renderedNewLine = renderNewLine(ctx);
  const renderedEmptyLine = `${renderedNewLine}${renderedIndentation}`;

  const renderedJSDoc = renderJSDoc(ctx, namespaceEntity);

  const renderedHeader = `${renderedIndentation}namespace ${namespaceEntity.name} {`;
  ctx.indentation++;

  const renderedBody = namespaceEntity.exports.map(
    signature => renderEntity(ctx, signature)
  ).join(renderedEmptyLine);

  ctx.indentation--;

  const renderedFooter = `${renderedIndentation}}`;

  return [
    renderedJSDoc,
    renderedHeader,
    renderedBody,
    renderedFooter
  ].filter(line => line)
    .join(renderedNewLine);

}
