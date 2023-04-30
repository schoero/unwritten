import { expect, it } from "vitest";

import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities.js";


scope("MarkupRenderer", "Tags", () => {

  const ctx = createRenderContext();

  it("should render tags correctly", () => {
    const convertedTags = convertTags(
      ctx,
      {
        beta: "",
        modifiers: ["readonly"],
        optional: true
      } as PropertyEntity
    );

    assert(convertedTags, "Converted tags are undefined");

    expect(convertedTags.children).to.include("readonly");
    expect(convertedTags.children).to.include("optional");
    expect(convertedTags.children).to.include("beta");

  });

  it("should not render empty tags", () => {
    const convertedTags = convertTags(
      ctx,
      {} as PropertyEntity
    );
    expect(convertedTags).to.equal("");
  });

});
