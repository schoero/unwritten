import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderJSDoc } from "unwritten:renderer:typescript/utils/jsdoc.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("TypeScriptRenderer", "utils", () => {

  const ctx = createRenderContext(BuiltInRenderers.TypeScript);

  it("should render nothing if no tags are available", () => {
    expect(renderJSDoc(ctx, {})).to.equal(undefined);
  });

  it("should render the description on a single line if no other tags are available", () => {
    expect(renderJSDoc(ctx, {
      description: "Description"
    })).to.equal(ts`
      /**
       * Description
       */
    `);
  });

  it("should add a separator line if other tags are available", () => {
    expect(renderJSDoc(ctx, {
      beta: undefined,
      description: "Description"
    })).to.equal(ts`
      /**
       * Description
       * 
       * @beta
       */
    `);
  });

  it("should render remarks properly", () => {
    expect(renderJSDoc(ctx, {
      description: "Description",
      remarks: "Remarks"
    })).to.equal(ts`
      /**
       * Description
       * 
       * @remarks Remarks
       */
    `);
  });

  it("should render example properly", () => {
    expect(renderJSDoc(ctx, {
      description: "Description",
      example: "Example"
    })).to.equal(ts`
      /**
       * Description
       * 
       * @example
       * Example
       */
    `);
  });

  it("should render tags properly", () => {
    expect(renderJSDoc(ctx, {
      alpha: undefined,
      beta: undefined,
      deprecated: undefined,
      internal: undefined
    })).to.equal(ts`
      /**
       * @alpha
       * @beta
       * @deprecated
       * @internal
       */
    `);
  });

  it("should render parameter descriptions properly", () => {
    expect(renderJSDoc(ctx, {
      description: "Description",
      parameters: [{
        description: "Parameter description",
        name: "parameter"
      }]
    })).to.equal(ts`
      /**
       * Description
       * 
       * @param parameter - Parameter description
       */
    `);
  });

  it("should render return type descriptions properly", () => {
    expect(renderJSDoc(ctx, {
      description: "Description",
      returnType: {
        description: "Return type description"
      }
    })).to.equal(ts`
      /**
       * Description
       * 
       * @returns Return type description
       */
    `);
  });

  it("should render type parameter descriptions properly", () => {
    expect(renderJSDoc(ctx, {
      description: "Description",
      typeParameters: [{
        description: "Type parameter description",
        name: "T"
      }]
    })).to.equal(ts`
      /**
       * Description
       * 
       * @template T - Type parameter description
       */
    `);
  });

});
