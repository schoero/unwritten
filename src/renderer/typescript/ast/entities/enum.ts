import { renderJSDoc } from "unwritten:renderer/typescript/utils/jsdoc.js";
import { renderType } from "unwritten:renderer:typescript/ast/index.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";

import type { EnumEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:ts/type-definitions/renderer.js";


export function renderEnumEntity(ctx: TypeScriptRenderContext, enumEntity: EnumEntity): string {


  const renderedNewline = renderNewLine(ctx);

  const renderedName = enumEntity.name;
  const renderedJSDoc = renderJSDoc(ctx, enumEntity);
  const renderedHeader = `${renderIndentation(ctx)}enum ${renderedName} {`;

  ctx.indentation++;

  const renderedMembers = enumEntity.members.map((member, index) => {

    const renderedJSDoc = renderJSDoc(ctx, member);
    const renderedName = member.name;
    const renderedType = renderType(ctx, member.type);
    const renderedComma = index === enumEntity.members.length - 1
      ? ""
      : ",";

    return [
      renderedJSDoc,
      `${renderIndentation(ctx)}${renderedName} = ${renderedType}${renderedComma}`
    ].filter(line => line)
      .join(renderedNewline);

  });

  ctx.indentation--;

  const renderedFooter = `${renderIndentation(ctx)}}`;

  return [
    renderedJSDoc,
    renderedHeader,
    ...renderedMembers,
    renderedFooter
  ].filter(line => line)
    .join(renderedNewline);

}
