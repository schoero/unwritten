import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { createInlineTitleNode, createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";

import type { Example } from "unwritten:interpreter:type-definitions/jsdoc";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedExamples,
  ConvertedExamplesForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertExamplesForDocumentation(ctx: MarkupRenderContext, examples: Example): ConvertedExamples {

  if(examples.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedExamples = examples.map(
    example => createParagraphNode(
      ...convertJSDocNodes(ctx, example.content)
    )
  );

  const exampleTranslation = translate("example", { capitalize: true, count: examples.length });
  const exampleAnchor = registerAnonymousAnchor(ctx, exampleTranslation);

  return createTitleNode(
    exampleTranslation,
    exampleAnchor,
    ...convertedExamples
  );

}


export function convertExamplesForType(ctx: MarkupRenderContext, examples: Example): ConvertedExamplesForType {

  if(examples.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedExamples = examples.map(
    example => createParagraphNode(
      ...convertJSDocNodes(ctx, example.content)
    )
  );

  const title = translate("example", { capitalize: true, count: examples.length });
  const anchor = registerAnonymousAnchor(ctx, title);

  return createInlineTitleNode(
    title,
    anchor,
    ...convertedExamples
  );

}
