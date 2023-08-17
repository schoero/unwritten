import { evaluateCondition } from "unwritten:renderer/markup/utils/condition.js";
import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConditionalNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderConditionalNode(ctx: HTMLRenderContext, conditionalNode: ConditionalNode): string {

  const conditionIsMet = evaluateCondition(
    conditionalNode.function,
    conditionalNode.args,
    conditionalNode.operator,
    conditionalNode.value
  );

  return conditionIsMet
    ? renderNode(ctx, conditionalNode.trueChildren)
    : renderNode(ctx, conditionalNode.falseChildren);

}
