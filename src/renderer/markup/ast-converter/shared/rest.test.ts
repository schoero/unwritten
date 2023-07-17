import { expect, it } from "vitest";

import { convertRest } from "unwritten:renderer/markup/ast-converter/shared/rest.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", "Rest", () => {

  const ctx = createRenderContext();

  const convertedRest = convertRest(
    ctx,
    {
      rest: true
    }
  );

  assert(convertedRest, "Converted rest is undefined.");

  it("should render the rest tag correctly", () => {
    expect(convertedRest).toContain("rest");
  });

});
