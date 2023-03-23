import { renderTypeParameterEntity } from "unwritten:renderer/typescript/ast/entities/type-parameter.js";
import { renderType } from "unwritten:renderer/typescript/ast/index.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";

import type { MappedType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderMappedType(ctx: TypeScriptRenderContext, mappedType: MappedType): string {

  const renderedNewLine = renderNewLine(ctx);

  const renderedHeader = `${renderIndentation(ctx)}{`;

  ctx.indentation++;

  const renderedReadonlyKeyword = mappedType.readonly ? "readonly " : "";
  const renderedQuestionMark = mappedType.optional ? "?" : "";

  const renderedTypeParameter = renderTypeParameterEntity(ctx, mappedType.typeParameter);

  const renderedMembers = mappedType.members.map(member => {

    const renderedKey = renderType(ctx, member.keyType);
    const renderedValue = renderType(ctx, member.valueType);

    return `${renderIndentation(ctx)}${renderedReadonlyKeyword}${renderedKey}${renderedQuestionMark}: ${renderedValue};`;

  });

  ctx.indentation--;

  const renderedFooter = `${renderedNewLine}${renderIndentation(ctx)}}`;

  return [
    renderedHeader,
    ...renderedMembers,
    renderedFooter
  ].join(renderedNewLine);

}
