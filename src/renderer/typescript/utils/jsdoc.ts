import { JSDocTags } from "unwritten:interpreter/enums/jsdoc.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";

import type { Entities } from "unwritten:interpreter/type-definitions/entities.js";
import type { JSDoc } from "unwritten:interpreter:type-definitions/shared.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";
import type { DeepPartial } from "unwritten:type-definitions/utils.js";


export const JSDOC_END = " */";
export const JSDOC_START = "/**";

export function renderJSDoc(ctx: TypeScriptRenderContext, jsdoc: DeepPartial<Entities> & JSDoc): string | undefined {

  if(ctx.config.renderConfig.ts.renderJSDoc === false){
    return;
  }

  const renderedIndentation = renderIndentation(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const start = [JSDOC_START];
  const end = [JSDOC_END];

  const description = renderJSDocDescription(ctx, jsdoc);
  const remarks = renderJSDocRemarks(ctx, jsdoc);
  const example = renderJSDocExample(ctx, jsdoc);
  const typeParameters = renderJSDocTypeParameters(ctx, jsdoc);
  const parameters = renderJSDocParameters(ctx, jsdoc);
  const returns = renderJSDocReturns(ctx, jsdoc);
  const tags = renderJSDocTags(ctx, jsdoc);

  const jsdocArray = [
    ...start,
    ...description,
    ...remarks,
    ...example,
    ...typeParameters,
    ...parameters,
    ...returns,
    ...tags,
    ...end
  ];

  const filteredOptionalTags = jsdocArray
    .map((line, index, array) => {
      if(Array.isArray(line) && index === array.length - 2){
        return;
      }
      return line;
    })
    .flat()
    .filter(line => line);


  if(filteredOptionalTags.length === 2){
    return;
  }

  return filteredOptionalTags
    .map(line => `${renderedIndentation}${line}`)
    .join(renderedNewLine);

}


function renderJSDocDescription(ctx: TypeScriptRenderContext, jsdoc: DeepPartial<Entities> & JSDoc): (string | [string])[] {
  return "description" in jsdoc && jsdoc.description
    ? [
      ` * ${jsdoc.description}`,
      [" * "]
    ]
    : [];
}

function renderJSDocRemarks(ctx: TypeScriptRenderContext, jsdoc: DeepPartial<Entities> & JSDoc): (string | [string])[] {
  return JSDocTags.Remarks in jsdoc && jsdoc.remarks
    ? [
      ` * @remarks ${jsdoc.remarks}`
    ]
    : [];
}

function renderJSDocExample(ctx: TypeScriptRenderContext, jsdoc: DeepPartial<Entities> & JSDoc): (string | [string])[] {
  return JSDocTags.Example in jsdoc && jsdoc.example
    ? [
      " * @example",
      ` * ${jsdoc.example}`
    ]
    : [];
}

function renderJSDocParameters(ctx: TypeScriptRenderContext, jsdoc: DeepPartial<Entities> & JSDoc): (string | [string])[] {
  return "parameters" in jsdoc && jsdoc.parameters?.every(parameter => parameter.description)
    ? jsdoc.parameters.map(
      parameter =>
        ` * @param ${parameter.name} - ${parameter.description}`
    )
    : [];
}

function renderJSDocReturns(ctx: TypeScriptRenderContext, jsdoc: DeepPartial<Entities> & JSDoc): (string | [string])[] {
  return "returnType" in jsdoc && jsdoc.returnType?.description
    ? [
      ` * @returns ${jsdoc.returnType.description}`
    ]
    : [];
}

function renderJSDocTypeParameters(ctx: TypeScriptRenderContext, jsdoc: DeepPartial<Entities> & JSDoc): (string | [string])[] {
  return "typeParameters" in jsdoc && jsdoc.typeParameters
    ? jsdoc.typeParameters.map(
      typeParameter =>
        ` * @template ${typeParameter.name} - ${typeParameter.description}`
    )
    : [];
}

function renderJSDocTags(ctx: TypeScriptRenderContext, jsdoc: JSDoc): (string | [string])[] {
  return [
    ...JSDocTags.Alpha in jsdoc ? [" * @alpha"] : [],
    ...JSDocTags.Beta in jsdoc ? [" * @beta"] : [],
    ...JSDocTags.Deprecated in jsdoc ? [" * @deprecated"] : [],
    ...JSDocTags.Internal in jsdoc ? [" * @internal"] : []
  ];
}
