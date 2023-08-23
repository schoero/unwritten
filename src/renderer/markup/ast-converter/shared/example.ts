import { createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { Examples } from "unwritten:interpreter:type-definitions/shared.js";
import type { ParagraphNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedExample } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertExample(ctx: MarkupRenderContexts, examples: Examples): ConvertedExample {

  if(!examples){
    return "";
  }

  const translate = getTranslator(ctx);

  const convertedExamples = examples.map(example => {
    if(!example){
      return;
    }
    return createParagraphNode(example);
  }).filter(node => !!node) as ParagraphNode[];

  return createTitleNode(
    translate("example", { capitalize: true, count: examples.length }),
    ...convertedExamples
  );

}
