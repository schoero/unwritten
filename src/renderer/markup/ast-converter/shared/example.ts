import { createInlineTitleNode, createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { Examples } from "unwritten:interpreter:type-definitions/shared.js";
import type { ASTNode, ParagraphNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedExamples,
  ConvertedExamplesForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertExamplesForDocumentation(ctx: MarkupRenderContexts, examples: Examples): ConvertedExamples {

  if(!examples){
    return "";
  }

  const translate = getTranslator(ctx);

  const convertedExamples = examples.flat().map(example => {
    if(!example){
      return;
    }
    return createParagraphNode(example);
  })
    .filter(node => !!node) as ParagraphNode[];

  return createTitleNode(
    translate("example", { capitalize: true, count: examples.length }),
    ...convertedExamples
  );

}


export function convertExamplesForType(ctx: MarkupRenderContexts, examples: Examples): ConvertedExamplesForType {

  if(!examples){
    return "";
  }

  const translate = getTranslator(ctx);

  const title = translate("example", { capitalize: true, count: examples.length });

  const convertedExamples = examples.flat().map(example => {
    if(!example){
      return;
    }
    return example;
  })
    .filter(node => !!node) as ASTNode[];

  return createInlineTitleNode(
    title,
    createParagraphNode(
      ...convertedExamples
    )
  );

}
