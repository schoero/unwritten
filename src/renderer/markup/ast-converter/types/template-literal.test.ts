import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertTemplateLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { isWrapperNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TemplateLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.StringLiteral, () => {

  {

    // #region Simple template literal

    const type: Testable<TemplateLiteralType> = {
      head: "",
      kind: TypeKind.TemplateLiteral,
      spans: [
        "px"
      ],
      types: [
        {
          kind: TypeKind.Number,
          name: "number"
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertTemplateLiteralType(ctx, type as TemplateLiteralType);

    it("should render template literal types", () => {
      expect(isWrapperNode(renderedType)).to.equal(true);
      expect(renderedType.children[0]).to.equal("${");
      expect(renderedType.children[1]).to.equal("number");
      expect(renderedType.children[2]).to.equal("}");
      expect(renderedType.children[3]).to.equal("px");
    });

  }

  {

    // #region complex template literal

    const type: Testable<TemplateLiteralType> = {
      head: "PREFIX-",
      kind: TypeKind.TemplateLiteral,
      spans: [
        "-MIDDLE-",
        "-SUFFIX"
      ],
      types: [
        {
          kind: TypeKind.Number,
          name: "number"
        },
        {
          kind: TypeKind.String,
          name: "string"
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertTemplateLiteralType(ctx, type as TemplateLiteralType);

    it("should render template literal types", () => {
      expect(renderedType).to.equal("PREFIX-${number}-MIDDLE-${string}-SUFFIX");
    });

  }

  {

    // #region complex template literal

    const type: Testable<TemplateLiteralType> = {
      head: "border-",
      kind: TypeKind.TemplateLiteral,
      spans: [
        "-",
        ": ",
        "px"
      ],
      types: [
        {
          kind: TypeKind.Union,
          types: [
            {
              kind: TypeKind.StringLiteral,
              name: "string",
              value: "top"
            },
            {
              kind: TypeKind.StringLiteral,
              name: "string",
              value: "bottom"
            },
            {
              kind: TypeKind.StringLiteral,
              name: "string",
              value: "left"
            },
            {
              kind: TypeKind.StringLiteral,
              name: "string",
              value: "right"
            }
          ]
        },
        {
          kind: TypeKind.StringLiteral,
          name: "string",
          value: "width"
        },
        {
          kind: TypeKind.Number,
          name: "number"
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertTemplateLiteralType(ctx, type as TemplateLiteralType);

    it("should render template literal types", () => {
      expect(renderedType).to.equal("border-${\"top\" | \"bottom\" | \"left\" | \"right\"}-${\"width\"}: ${number}px");
    });

  }

});
