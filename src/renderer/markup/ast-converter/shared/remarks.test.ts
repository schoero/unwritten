import { expect, it } from "vitest";

import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", "Remarks", () => {

  const ctx = createRenderContext();

  const convertedRemarks = convertRemarks(
    ctx,
    "Remarks description"
  );

  assert(convertedRemarks, "Converted remarks is undefined");

  const {
    title,
    children
  } = convertedRemarks;

  it("should have a matching title", () => {
    expect(title).to.equal("Remarks");
  });

  it("should have a matching description", () => {
    expect(children[0].children[0]).to.equal("Remarks description");
  });

});
