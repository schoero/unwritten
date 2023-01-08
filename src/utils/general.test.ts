/* eslint-disable sort-keys/sort-keys-fix */
import { describe, expect, it } from "vitest";

import { scope } from "quickdoks:tests:utils/scope.js";

import { sortKeys } from "./general.js";


scope("Compiler", "Utils", () => {

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
      expect(JSON.stringify(unsortedObject, sortKeys)).to.equal(JSON.stringify({
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
