import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  renderFunctionForDocumentation,
  renderFunctionForTableOfContents
} from "unwritten:renderer:markup/ast/entities/function.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { FunctionEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", EntityKind.Function, () => {

  {

    // #region Entity

    const testFunction: Testable<FunctionEntity> = {
      kind: EntityKind.Function,
      name: "testFunction",
      signatures: [
        {
          beta: undefined,
          description: "Function description",
          example: "testFunction();",
          kind: EntityKind.Signature,
          name: "testFunction",
          parameters: [],
          position: {
            column: 4,
            file: "/file.ts",
            line: 9
          },
          remarks: "This is a remark",
          returnType: {
            description: "Returns nothing",
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: []
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContents = renderFunctionForTableOfContents(ctx, testFunction as FunctionEntity);
    const renderedFunctionForDocumentation = renderFunctionForDocumentation(ctx, testFunction as FunctionEntity);

    it("should have only one signature", () => {
      expect(renderedFunctionForTableOfContents).to.have.lengthOf(1);
      expect(Object.keys(renderedFunctionForDocumentation)).to.have.lengthOf(1);
    });

    const renderedFunctionSignature = Object.keys(renderedFunctionForDocumentation)[0]!;
    const renderedFunctionBody = renderedFunctionForDocumentation[renderedFunctionSignature]!;

    const [
      tags,
      position,
      parametersAndReturnType,
      description,
      remarks,
      example
    ] = renderedFunctionBody;

    it("should have matching function signature", () => {
      expect(renderedFunctionForTableOfContents[0]).to.equal("testFunction()");
      expect(renderedFunctionSignature).to.equal("testFunction()");
    });

    it("should have a position", () => {
      expect(position).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      expect(tags).to.not.equal(undefined);
    });

    it("should have a matching return type", () => {
      expect(parametersAndReturnType[0][0]).to.equal("Returns: void Returns nothing");
    });

    it("should have a matching description", () => {
      expect(description).to.equal("Function description");
    });

    it("should have matching remarks", () => {
      expect(remarks).to.equal("This is a remark");
    });

    it("should have a matching example", () => {
      expect(example).to.equal("testFunction();");
    });

  }

});
