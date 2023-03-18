import { expect, it } from "vitest";

import { renderModifiers } from "unwritten:renderer/typescript/utils/modifiers.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("TypeScriptRenderer", "utils", () => {

  it("should render empty modifiers as a empty string", () => {
    expect(renderModifiers([])).to.equal("");
  });

  it("should render modifiers with a trailing space", () => {
    expect(renderModifiers(["public", "static"])).to.equal("public static ");
  });

});
