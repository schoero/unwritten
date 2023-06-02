import { expect, it } from "vitest";

import { convertTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities.js";


scope("MarkupRenderer", "Tags", () => {

  const ctx = createRenderContext();

  it("should render tags correctly", () => {
    const convertedTags = convertTagsForDocumentation(
      ctx,
      {
        beta: "",
        modifiers: ["readonly"],
        optional: true
      } as PropertyEntity
    );

    assert(convertedTags, "Converted tags are undefined");

    expect(convertedTags.children).toContain("readonly");
    expect(convertedTags.children).toContain("optional");
    expect(convertedTags.children).toContain("beta");

  });

  it("should not render empty tags", () => {
    const convertedTags = convertTagsForDocumentation(
      ctx,
      {} as PropertyEntity
    );
    expect(convertedTags).toBe("");
  });

});
