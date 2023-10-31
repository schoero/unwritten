import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { renderNode } from "unwritten:renderer/index";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import type { Position } from "unwritten:interpreter/type-definitions/shared";


scope("MarkupRenderer", "Position", () => {

  const position: Position = {
    column: 1,
    file: "/src/some/file.ts",
    line: 7
  };

  it("should convert the position correctly", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const convertedPosition = convertPositionForDocumentation(ctx, position);
    const renderedPosition = renderNode(ctx, convertedPosition);

    expect(renderedPosition).toBe(md`
        
      Defined in: [src/some/file.ts](../src/some/file.ts#L7C1)  
    `);

  });

  it("should be possible to change to label to an empty string", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);
    ctx.config.renderConfig[BuiltInRenderers.Markdown].translations.definedIn = "";

    const convertedPosition = convertPositionForDocumentation(ctx, position);
    const renderedPosition = renderNode(ctx, convertedPosition);

    expect(renderedPosition).toBe(md`
        
      [src/some/file.ts](../src/some/file.ts#L7C1)  
    `);

  });

  it("should be possible disable the rendering of source code links", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);
    ctx.config.renderConfig[BuiltInRenderers.Markdown].renderSourceCodeLinks = false;

    const convertedPosition = convertPositionForDocumentation(ctx, position);
    const renderedPosition = renderNode(ctx, convertedPosition);

    expect(renderedPosition).toBe("");

  });

});
