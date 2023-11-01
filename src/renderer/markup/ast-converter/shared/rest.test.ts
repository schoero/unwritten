import { expect, it } from "vitest";

import { convertRest } from "unwritten:renderer/markup/ast-converter/shared/rest";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";


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
