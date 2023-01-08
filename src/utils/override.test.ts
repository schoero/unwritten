import { describe, expect, it } from "vitest";

import { override } from "./override.js";


describe("override", () => {

  {
    const result = override({ a: "original" }, { a: "overridden" });
    it("should override existing properties", () => {
      expect(result.a).to.equal("overridden");
    });
  }
  {
    const result = override({ a: "original", b: "original" }, { b: "overridden" });
    it("should not change untouched entries", () => {
      expect(result.a).to.equal("original");
      expect(result.b).to.equal("overridden");
    });
  }
  {
    const result = override({ a: "original", b: "original" }, { c: "overridden" });
    it("should extend the original object", () => {
      expect(result.a).to.equal("original");
      expect(result.b).to.equal("original");
      expect(result.c).to.equal("overridden");
    });
  }
  {
    const result = override({ a: { b: "original", c: "original" } }, { a: { c: "overridden" } });
    it("should override nested properties", () => {
      expect(result.a.b).to.equal("original");
      expect(result.a.c).to.equal("overridden");
    });
  }
  {
    const result = override({ a: { b: "original" } }, { a: {} });
    it("should be possible to override the whole object with an empty object", () => {
      expect(Object.keys(result.a)).to.have.lengthOf(0);
    });
  }

});
