import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { convertInitializerForType } from "unwritten:renderer/markup/ast-converter/shared/initializer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ArrayType, NumberLiteralType } from "unwritten:interpreter/type-definitions/types.js";


scope("MarkupRenderer", "Example", () => {

  {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedInitializer = convertInitializerForType(
      ctx,
      <NumberLiteralType>{
        kind: TypeKind.NumberLiteral,
        value: 7
      }
    );

    it("should render primitive types inline", () => {
      expect(convertedInitializer.inlineInitializer).toBeDefined();
      expect(convertedInitializer.multilineInitializer).toBeUndefined();
    });

  }

  {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedInitializer = convertInitializerForType(
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
      expect(convertedInitializer.inlineInitializer).toBeUndefined();
      expect(convertedInitializer.multilineInitializer).toBeDefined();
    });

  }

});
