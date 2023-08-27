import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { isLinkNode, isSmallNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

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

    assert(isSmallNode(convertedPosition));
    assert(convertedPosition.children.length === 2);

    expect(convertedPosition.children[0]).toBe("Defined in: ");
    expect(isLinkNode(convertedPosition.children[1])).toBe(true);

    expect(convertedPosition.children[1].children[0]).toBe("src/some/file.ts");
    expect(convertedPosition.children[1].link).toBe("../src/some/file.ts#L7C1");

  });

  it("should be possible to change to label to an empty string", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);
    ctx.config.renderConfig.md.translations.definedIn = "";
    const convertedPosition = convertPositionForDocumentation(ctx, position);

    assert(isSmallNode(convertedPosition));
    assert(convertedPosition.children.length === 1);

    expect(isLinkNode(convertedPosition.children[0])).toBe(true);

    expect(convertedPosition.children[0].children[0]).toBe("src/some/file.ts");
    expect(convertedPosition.children[0].link).toBe("../src/some/file.ts#L7C1");

  });

});
