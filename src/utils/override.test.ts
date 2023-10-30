import { describe, expect, it } from "vitest";

import { override } from "./override";


describe("override", () => {

  {
    const result = override({ a: "original" }, { a: "overridden" });
    it("should override existing properties", () => {
      expect(result.a).toBe("overridden");
    });
  }
  {
    const result = override({ a: "original", b: "original" }, { b: "overridden" });
    it("should not change untouched entries", () => {
      expect(result.a).toBe("original");
      expect(result.b).toBe("overridden");
    });
  }
  {
    const result = override({ a: "original", b: "original" }, { c: "overridden" });
    it("should extend the original object", () => {
      expect(result.a).toBe("original");
      expect(result.b).toBe("original");
      expect(result.c).toBe("overridden");
    });
  }
  {
    const result = override({ a: { b: "original", c: "original" } }, { a: { c: "overridden" } });
    it("should override nested properties", () => {
      expect(result.a.b).toBe("original");
      expect(result.a.c).toBe("overridden");
    });
  }
  {
    const result = override({ a: { b: "original" } }, { a: {} });
    it("should be possible to override the whole object with an empty object", () => {
      expect(Object.keys(result.a)).toHaveLength(0);
    });
  }

});
