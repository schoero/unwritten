import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNode } from "unwritten:renderer/index.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import type { Position } from "unwritten:interpreter/type-definitions/shared.js";


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

});
