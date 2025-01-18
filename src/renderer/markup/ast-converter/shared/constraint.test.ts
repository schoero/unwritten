import { TypeKind } from "unwritten:interpreter/enums/type";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { convertConstraintForType } from "unwritten:renderer/markup/ast-converter/shared/constraint";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { expect, it } from "vitest";

import type { ArrayType, NumberLiteralType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", "Example", () => {

  {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedConstraint = convertConstraintForType(
      ctx,
      <NumberLiteralType>{
        kind: TypeKind.NumberLiteral,
        value: 7
      }
    );

    it("should render primitive types inline", () => {
      expect(convertedConstraint.inlineConstraint).toBeDefined();
      expect(convertedConstraint.multilineConstraint).toBeUndefined();
    });

  }

  {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedConstraint = convertConstraintForType(
      ctx,
      <ArrayType>{
        kind: TypeKind.Array,
        type: {
          kind: TypeKind.NumberLiteral,
          value: 7
        }
      }
    );

    it("should render complex types with an inline title", () => {
      expect(convertedConstraint.inlineConstraint).toBeUndefined();
      expect(convertedConstraint.multilineConstraint).toBeDefined();
    });

  }

});
