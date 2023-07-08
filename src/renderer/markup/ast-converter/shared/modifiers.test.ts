import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { convertModifiers } from "unwritten:renderer:markup/ast-converter/shared/modifiers.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", "Modifiers", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  const convertedModifiers = convertModifiers(
    ctx,
    ["readonly", "optional"]
  );

  assert(convertedModifiers, "Converted modifiers are undefined");

  it("should have a matching title", () => {
    expect(convertedModifiers).toContain("readonly");
    expect(convertedModifiers).toContain("optional");
  });

});
