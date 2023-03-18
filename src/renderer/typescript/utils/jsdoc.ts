import { renderIndentation } from "unwritten:renderer:utils/indentation.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";

import type { JSDoc } from "unwritten:interpreter:type-definitions/shared.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderJSDoc(ctx: TypeScriptRenderContext, jsdoc: JSDoc): string {

  const renderedIndentation = renderIndentation(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const jsdocArray = [
    `/**`,
    Object.hasOwn(jsdoc, "description") && [
      ` * ${jsdoc.description}`,
      Object.keys(jsdoc).length > 1 && ` * `
    ],
    Object.hasOwn(jsdoc, "remarks") && ` * @remarks ${jsdoc.remarks}`,
    Object.hasOwn(jsdoc, "example") && [
      ` * @example`,
      ` * ${jsdoc.example}`
    ],
    Object.hasOwn(jsdoc, "alpha") && ` * @alpha`,
    Object.hasOwn(jsdoc, "beta") && ` * @beta`,
    Object.hasOwn(jsdoc, "deprecated") && ` * @deprecated`,
    Object.hasOwn(jsdoc, "internal") && ` * @internal`,
    ` */`
  ];

  const returnValue = jsdocArray
    .flat()
    .filter(line => line)
    .map(line => `${renderedIndentation}${line}`)
    .join(renderedNewLine);

  return returnValue;

}
