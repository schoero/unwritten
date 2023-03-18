import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderJSDoc } from "unwritten:renderer:typescript/utils/jsdoc.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("TypeScriptRenderer", "utils", () => {

  const ctx = createRenderContext(BuiltInRenderers.TypeScript);

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

});
