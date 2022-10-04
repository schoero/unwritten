import { describe, expect, it } from "vitest";

import { setConfig } from "../../src/config/index.js";
import { createRenderedFunction } from "../../src/renderer/types/function.js";
import { Function, PrimitiveType, TypeKind } from "../../src/types/types.js";
import { CompleteEntity, TestableEntity } from "../../src/types/utils.js";


setConfig({
  renderConfig: {
    parameterEncapsulation: false,
    stringLiteralTypeEncapsulation: false,
    tagEncapsulation: false,
    typeEncapsulation: false
  }
});

describe("Renderer: Function", function() {

  const testFunction: TestableEntity<Function> = {
    kind: TypeKind.Function,
    name: "testFunction",
    signatures: [
      {
        kind: TypeKind.Signature,
        modifiers: [],
        parameters: [],
        returnType: <PrimitiveType<TypeKind.String>>{
          kind: TypeKind.String
        }
      }
    ]
  };

  const renderedFunction = createRenderedFunction(<CompleteEntity<Function>>testFunction);

  console.log(JSON.stringify(renderedFunction, null, 2));

  it("should render a function", () => {
    expect(renderedFunction).to.not.be.undefined;
  });

});