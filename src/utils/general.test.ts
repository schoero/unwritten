/* eslint-disable sort-keys/sort-keys-fix */
import { describe, expect, it } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";

import { sortKeys } from "./general.js";


scope("Interpreter", "Utils", () => {

  describe("sortKeys", () => {

    const unsortedObject = {
      b: "b",
      c: {
        e: "e",
        d: "d"
      },
      a: "a"
    };

    it("should sort keys", () => {
      expect(JSON.stringify(unsortedObject, sortKeys)).toBe(JSON.stringify({
        a: "a",
        b: "b",
        c: {
          d: "d",
          e: "e"
        }
      }));
    });

  });
});
