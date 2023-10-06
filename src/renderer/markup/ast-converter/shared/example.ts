import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry.js";
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
    return;
  }

  const translate = getTranslator(ctx);

  const convertedExamples = examples.flat().map(example => {
    if(!example){
      return;
    }
    return createParagraphNode(example);
  })
    .filter(node => !!node) as ParagraphNode[];

  const exampleTranslation = translate("example", { capitalize: true, count: examples.length });
  const exampleAnchor = registerAnonymousAnchor(ctx, exampleTranslation);

  return createTitleNode(
    exampleTranslation,
    exampleAnchor,
    ...convertedExamples
  );

}


export function convertExamplesForType(ctx: MarkupRenderContexts, examples: Examples): ConvertedExamplesForType {

  if(!examples){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedExamples = examples.flat().map(example => {
    if(!example){
      return;
    }
    return example;
  })
    .filter(node => !!node) as ASTNode[];

  const title = translate("example", { capitalize: true, count: examples.length });
  const anchor = registerAnonymousAnchor(ctx, title);

  return createInlineTitleNode(
    title,
    anchor,
    createParagraphNode(
      ...convertedExamples
    )
  );

}
