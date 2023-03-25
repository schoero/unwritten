import { expectTypeOf, test } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";

import type { Complete, DeepPartialByKey, DeepRequiredByKey, TranslationWithoutSuffixes } from "./utils.js";


scope("Types", "Utils", () => {

  test("DeepPartialByKey", () => {

    type TestType = {
      id: number;
      name: string;
      type: {
        id: number;
        name: string;
      };
    };

    expectTypeOf<DeepPartialByKey<TestType, "id">>().toEqualTypeOf<{
      name: string;
      type: {
        name: string;
        id?: number;
      };
      id?: number;
    }>();

  });

  test("DeepRequiredByKey", () => {

    type TestType = {
      name: string;
      type: {
        name: string;
        id?: number;
      };
      id?: number;
    };

    expectTypeOf<DeepRequiredByKey<TestType, "id">>().toEqualTypeOf<{
      id: number;
      name: string;
      type: {
        id: number;
        name: string;
      };
    }>();

  });

  test("Complete", () => {

    type TestType = {
      name?: string;
      nested?: {
        nestedName?: string;
      };
    };

    expectTypeOf<Complete<TestType>>().toEqualTypeOf<{
      name: string;
      nested: {
        nestedName: string;
      };
    }>();

  });

  test("TranslationWithoutSuffixes", () => {

    type TestType = {
      name_one?: string;
      name_other?: string;
    };

    expectTypeOf<TranslationWithoutSuffixes<TestType>>().toEqualTypeOf<{
      name?: string;
    }>();

  });

});
