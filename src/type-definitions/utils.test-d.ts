import { expectTypeOf, it } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";

import type { DeepPartialByKey, DeepRequiredByKey } from "./utils.js";


scope("Types", "Utils", () => {

  {

    type TestType = {
      id: number;
      name: string;
      type: {
        id: number;
        name: string;
      };
    };

    it("should make deep nested properties that match the key optional", () => {
      expectTypeOf<DeepPartialByKey<TestType, "id">>().toEqualTypeOf<{
        name: string;
        type: {
          name: string;
          id?: number;
        };
        id?: number;
      }>();
    });

  }

  {

    type TestType = {
      name: string;
      type: {
        name: string;
        id?: number;
      };
      id?: number;
    };

    it("should make deep nested properties that match the key required", () => {
      expectTypeOf<DeepRequiredByKey<TestType, "id">>().toEqualTypeOf<{
        id: number;
        name: string;
        type: {
          id: number;
          name: string;
        };
      }>();
    });

  }

});
