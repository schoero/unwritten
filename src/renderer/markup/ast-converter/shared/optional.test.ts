import { expect, it } from "vitest";

import { convertOptional } from "unwritten:renderer:markup/ast-converter/shared/optional";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";


scope("MarkupRenderer", "Optional", () => {

  const ctx = createRenderContext();

  const convertedOptional = convertOptional(
    ctx,
    {
      optional: true
    }
  );

  assert(convertedOptional, "Converted optional is undefined.");

  it("should render the optional tag correctly", () => {
    expect(convertedOptional).toContain("optional");
  });

});
