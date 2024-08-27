import { expect, it } from "vitest";

import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { renderNode } from "unwritten:renderer/markup/markdown/index";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities";


scope("MarkupRenderer", "Tags", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render tags correctly", () => {
    const convertedTags = convertTagsForDocumentation(
      ctx,
      {
        beta: "",
        modifiers: ["readonly"],
        name: "test",
        optional: true,
        type: {}
      } as unknown as PropertyEntity
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
