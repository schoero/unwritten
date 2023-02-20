import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertArrayType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { isWrapperNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ArrayType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Array, () => {

  {

    // #region simple array

    const type: Testable<ArrayType> = {
      kind: TypeKind.Array,
      type: {
        kind: TypeKind.String,
        name: "string"
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertArrayType(ctx, type as ArrayType);

    it("should be able to render arrays", () => {
      expect(isWrapperNode(renderedType)).to.equal(true);
      expect(renderedType.children).to.have.lengthOf(2);
      expect(renderedType.children[0]).to.equal("string");
      expect(renderedType.children[1]).to.equal("[]");
    });

  }

  {

    // #region union array

    const type: Testable<ArrayType> = {
      kind: TypeKind.Array,
      type: {
        kind: TypeKind.Union,
        types: [
          {
            kind: TypeKind.String,
            name: "string"
          },
          {
            kind: TypeKind.Number,
            name: "number"
          }
        ]
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertArrayType(ctx, type as ArrayType);

    it("should add parentheses around union types", () => {
      expect(isWrapperNode(renderedType)).to.equal(true);
      expect(renderedType.children).to.have.lengthOf(4);
      expect(renderedType.children[0]).to.equal("(");
      expect(renderedType.children[1]).to.equal("string | number");
      expect(renderedType.children[2]).to.equal(")");
      expect(renderedType.children[3]).to.equal("[]");
    });

  }

});
