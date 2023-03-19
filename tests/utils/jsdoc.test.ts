import { describe, expect, it } from "vitest";

import { JSDOC_END, JSDOC_START } from "unwritten:renderer/typescript/utils/jsdoc.js";
import { splitJSDocAndDeclaration } from "unwritten:tests:utils/jsdoc.js";


describe("Test utils", () => {

  it("should split single jsdoc tags correctly", () => {
    const [jsdocLines, declarationLines] = splitJSDocAndDeclaration([
      JSDOC_START,
      JSDOC_END,
      "declaration"
    ]);

    expect(jsdocLines).to.have.lengthOf(1);
    expect(declarationLines).to.have.lengthOf(1);

  });

  it("should split multiple jsdoc tags correctly", () => {
    const [jsdocLines, declarationLines] = splitJSDocAndDeclaration([
      JSDOC_START,
      JSDOC_END,
      "declaration",
      JSDOC_START,
      JSDOC_END,
      "declaration2"
    ]);

    expect(jsdocLines).to.have.lengthOf(2);
    expect(declarationLines).to.have.lengthOf(2);

  });

});
