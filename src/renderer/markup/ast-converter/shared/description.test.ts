import { expect, it } from "vitest";

import { convertDescriptionForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", "Description", () => {

  const ctx = createRenderContext();

  const convertedDescription = convertDescriptionForDocumentation(
    ctx,
    "Description description"
  );

  assert(convertedDescription, "Converted description is undefined");

  const {
    title,
    children
  } = convertedDescription;

  it("should have a matching title", () => {
    expect(title).to.equal("Description");
  });

  it("should have a matching description", () => {
    expect(children[0].children[0]).to.equal("Description description");
  });

});
