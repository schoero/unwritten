import { renderType } from "unwritten:renderer/typescript/ast/index.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";

import type { EnumEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:ts/type-definitions/renderer.js";


export function renderEnumEntity(ctx: TypeScriptRenderContext, enumEntity: EnumEntity): string {

  const name = enumEntity.name;

  const renderedNewline = renderNewLine(ctx);

  const renderedHeader = `${renderIndentation(ctx)}enum ${name} {`;

  ctx.indentation++;

  const renderedMembers = enumEntity.members.map((member, index) => {
    const name = member.name;
    const type = renderType(ctx, member.type);
    const comma = index === enumEntity.members.length - 1
      ? ""
      : ",";
    return `${renderIndentation(ctx)}${name} = ${type}${comma}`;
  });

  ctx.indentation--;

  const renderedFooter = `${renderIndentation(ctx)}}`;

  return [
    renderedHeader,
    ...renderedMembers,
    renderedFooter
  ].join(renderedNewline);

}
