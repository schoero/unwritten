/* eslint-disable eslint-plugin-perfectionist/sort-objects */
import { describe, expect, it } from "vitest";

import { scope } from "unwritten:tests:utils/scope";

import { sortKeys } from "./general";


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
