import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { convertThrowsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/throws.js";
import { isListNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", "Throws", () => {

  {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedThrows = convertThrowsForDocumentation(
      ctx,
      [{
        description: "Error description"
      }]
    );

    assert(convertedThrows, "Converted throws is undefined");

    const {
      children,
      title
    } = convertedThrows;

    it("should have a matching title", () => {
      expect(title).toBe("Throws");
    });

    it("should render only the description if no error type is defined", () => {
      assert(isListNode(children[0]));
      assert(Array.isArray(children[0].children[0]));
      expect(children[0].children[0][0]).toBe("Error description");
    });

  }

  {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedThrows = convertThrowsForDocumentation(
      ctx,
      [
        {
          description: "Error description",
          type: {
            kind: TypeKind.TypeReference,
            name: "RangeError",
            typeId: 1
          }
        },
        {
          description: "Error description 2",
          type: {
            kind: TypeKind.TypeReference,
            name: "Error",
            typeId: 1
          }
        }
      ]
    );

    assert(convertedThrows, "Converted throws is undefined");

    const {
      children,
      title
    } = convertedThrows;

    it("should have a matching title", () => {
      expect(title).toBe("Throws");
    });

    it("should render only the description if no error type is defined", () => {
      assert(isListNode(children[0]));
      assert(Array.isArray(children[0].children[0]));
      assert(Array.isArray(children[0].children[0][0]));

      const [inlineRangeType] = children[0].children[0][0];

      expect(inlineRangeType).toContain("RangeError");
      expect(inlineRangeType).toContain("Error description");
      assert(Array.isArray(children[0].children[0]));
      assert(Array.isArray(children[0].children[0][1]));

      const [multilineErrorType] = children[0].children[0][1];

      expect(multilineErrorType).toContain("Error");
      expect(multilineErrorType).toContain("Error description 2");
    });

  }

});
