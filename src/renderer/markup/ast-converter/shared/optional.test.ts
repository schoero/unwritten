import { expect, it } from "vitest";

import { convertOptional } from "unwritten:renderer/markup/ast-converter/shared/optional.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


// TODO: Implement this test

scope("MarkupRenderer", "Optional", () => {

  const ctx = createRenderContext();

  const convertedOptional = convertOptional(
    ctx,
    {
      optional: true
    }
  );

  assert(convertedOptional, "Converted optional undefined");

  it("should render the optional tag correctly", () => {
    expect(convertedOptional).to.contain("optional");
  });

});
