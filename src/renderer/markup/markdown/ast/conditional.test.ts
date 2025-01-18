import { createConditionalNode } from "unwritten:renderer:markup/utils/nodes";
import { renderNode } from "unwritten:renderer/index";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { expect, it } from "vitest";


scope("HTMLRenderer", "ConditionalNode", () => {

  it("should render the trueChildren if the condition is met", () => {

    const ctx = createRenderContext();

    const conditionalNode = createConditionalNode(
      () => true,
      [],
      "===",
      true,
      "trueChildren",
      "falseChildren"
    );

    expect(renderNode(ctx, conditionalNode)).toBe("trueChildren");

  });

  it("should render the falseChildren if the condition is not met", () => {

    const ctx = createRenderContext();

    const conditionalNode = createConditionalNode(
      () => true,
      [],
      "===",
      false,
      "trueChildren",
      "falseChildren"
    );

    expect(renderNode(ctx, conditionalNode)).toBe("falseChildren");

  });

});
