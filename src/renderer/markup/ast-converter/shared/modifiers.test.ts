import { convertModifiers } from "unwritten:renderer:markup/ast-converter/shared/modifiers";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { expect, it } from "vitest";


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
