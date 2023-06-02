import { expect, it } from "vitest";

import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { isLinkNode, isSmallNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { Position } from "unwritten:interpreter/type-definitions/shared.js";


scope("MarkupRenderer", "Position", () => {

  const ctx = createRenderContext();

  const position: Position = {
    column: 1,
    file: "src/renderer/markup/index.ts",
    line: 7
  };

  const convertedPosition = convertPosition(ctx, position);

  it("should convert the position correctly", () => {
    assert(isSmallNode(convertedPosition));
    assert(isLinkNode(convertedPosition.children[0]));
    expect(convertedPosition.children[0].children[0]).toBe("src/renderer/markup/index.ts");
    expect(convertedPosition.children[0].link).toBe("../src/renderer/markup/index.ts#L7C1");
  });

});
