import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { convertConstraintForType } from "unwritten:renderer/markup/ast-converter/shared/constraint.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ArrayType, NumberLiteralType } from "unwritten:interpreter/type-definitions/types.js";


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
