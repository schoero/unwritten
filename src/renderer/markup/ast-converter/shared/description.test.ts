import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", "Description", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  const convertedDescription = convertDescriptionForDocumentation(
    ctx,
    "Description description"
  );

  assert(convertedDescription, "Converted description is undefined");

  const {
    children,
    title
  } = convertedDescription;

  it("should have a matching title", () => {
    expect(title).toBe("Description");
  });

  it("should have a matching description", () => {
    expect(children[0].children[0]).toBe("Description description");
  });

});
