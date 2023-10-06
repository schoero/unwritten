import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNode } from "unwritten:renderer/markup/markdown/index.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities.js";


scope("MarkupRenderer", "Tags", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render tags correctly", () => {
    const convertedTags = convertTagsForDocumentation(
      ctx,
      {
        beta: "",
        modifiers: ["readonly"],
        optional: true
      } as PropertyEntity
    );

    const renderedTags = renderNode(ctx, convertedTags);

    expect(renderedTags).toContain("readonly");
    expect(renderedTags).toContain("optional");
    expect(renderedTags).toContain("beta");

  });

  it("should not render empty tags", () => {
    const convertedTags = convertTagsForDocumentation(
      ctx,
      {} as PropertyEntity
    );
    expect(convertedTags).toBeFalsy();
  });

});
