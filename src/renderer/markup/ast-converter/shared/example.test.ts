import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", "Example", () => {

  {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedExample = convertExamplesForDocumentation(
      ctx,
      [
        ["Example description"]
      ]
    );

    assert(convertedExample, "Converted example is undefined");

    const {
      children,
      title
    } = convertedExample;

    it("should have a matching title", () => {
      expect(title).toBe("Example");
    });

    it("should have a matching description", () => {
      expect(children).toHaveLength(1);
      expect(children[0].children[0]).toBe("Example description");
    });

  }

  {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedExample = convertExamplesForDocumentation(
      ctx,
      [
        ["Example description 1"],
        ["Example description 2"]
      ]
    );

    assert(convertedExample, "Converted example is undefined");

    const {
      children,
      title
    } = convertedExample;

    it("should have a matching title", () => {
      expect(title).toBe("Examples");
    });

    it("should have a matching description", () => {
      expect(children).toHaveLength(2);
      expect(children[0].children[0]).toBe("Example description 1");
      expect(children[1].children[0]).toBe("Example description 2");
    });

  }

});
