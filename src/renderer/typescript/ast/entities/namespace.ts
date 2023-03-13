import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { renderEntity } from "unwritten:renderer/typescript/ast/index.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";

import type { NamespaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderNamespaceEntity(ctx: TypeScriptRenderContext, namespaceEntity: NamespaceEntity): string {

  const renderConfig = getRenderConfig(ctx);

  const renderedIndentation = renderIndentation(ctx);
  const renderedEmptyLine = `${renderNewLine(ctx)}${renderNewLine(ctx)}`;

  const renderedHeader = `${renderedIndentation}namespace ${namespaceEntity.name} {`;
  ctx.indentation++;

  const renderedBody = namespaceEntity.exports.map(
    signature => renderEntity(ctx, signature)
  ).join(renderedEmptyLine);

  ctx.indentation--;

  const renderedFooter = `${renderedIndentation}}`;

  return [
    renderedHeader,
    renderedBody,
    renderedFooter
  ].join(renderedEmptyLine);

}
