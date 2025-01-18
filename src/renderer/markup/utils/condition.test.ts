import { evaluateCondition } from "unwritten:renderer/markup/utils/condition";
import { scope } from "unwritten:tests:utils/scope";
import { describe, expect, it } from "vitest";


scope("Renderer", "utils", () => {

  describe("condition", () => {

    const func = (a: number, b: number) => a + b;
    const args = [1, 2];

    it("should evaluate conditions correctly", () => {
      expect(evaluateCondition(func, args, "==", 3)).toBe(true);
      expect(evaluateCondition(func, args, "===", 3)).toBe(true);
      expect(evaluateCondition(func, args, "!=", 3)).toBe(false);
      expect(evaluateCondition(func, args, "!==", 3)).toBe(false);
      expect(evaluateCondition(func, args, "&&", true)).toBe(true);
      expect(evaluateCondition(func, args, "&&", false)).toBe(false);
      expect(evaluateCondition(func, args, "||", true)).toBe(3);
      expect(evaluateCondition(func, args, "||", false)).toBe(3);
      expect(evaluateCondition(func, args, "<", 3)).toBe(false);
      expect(evaluateCondition(func, args, "<=", 3)).toBe(true);
      expect(evaluateCondition(func, args, ">", 3)).toBe(false);
      expect(evaluateCondition(func, args, ">=", 3)).toBe(true);
    });

  });

});
