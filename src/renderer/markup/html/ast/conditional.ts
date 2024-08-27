import { renderNode } from "unwritten:renderer:html:index";
import { evaluateCondition } from "unwritten:renderer/markup/utils/condition";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConditionalNode } from "unwritten:renderer:markup/types-definitions/nodes";


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
