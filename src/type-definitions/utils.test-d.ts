import { scope } from "unwritten:tests:utils/scope";
import { describe, expectTypeOf, it, test } from "vitest";

import type { Complete, DeepPartialByKey, DeepRequiredByKey, Disable, Enable, Toggle } from "./utils";


scope("Types", "Utils", () => {

  describe("Enable", () => {
    it("should convert false to true", () => {
      expectTypeOf<Enable<false>>().toEqualTypeOf<true>();
    });
    it("should keep true as true", () => {
      expectTypeOf<Enable<true>>().toEqualTypeOf<true>();
    });
  });

  describe("Disable", () => {
    it("should convert true to false", () => {
      expectTypeOf<Disable<true>>().toEqualTypeOf<false>();
    });
    it("should keep false as false", () => {
      expectTypeOf<Disable<false>>().toEqualTypeOf<false>();
    });
  });

  describe("Toggle", () => {
    it("should toggle booleans", () => {
      expectTypeOf<Toggle<true>>().toEqualTypeOf<false>();
      expectTypeOf<Toggle<false>>().toEqualTypeOf<true>();
    });
  });

  describe("DeepRequiredByKey", () => {

    it("should make deeply nested properties required", () => {

      type TestType = {
        a?: string;
        b?: {
          c?: string;
        };
      };

      expectTypeOf<DeepRequiredByKey<TestType>>().toEqualTypeOf<{
        a: string;
        b: {
          c: string;
        };
      }>();

    });

    it("should be possible to make it shallow", () => {

      type TestType = {
        a?: string;
        b?: {
          c?: string;
        };
        d?: [{
          e?: string;
        }];
      };

      expectTypeOf<DeepRequiredByKey<TestType, PropertyKey, false>>().toEqualTypeOf<{
        a: string;
        b: {
          c?: string;
        };
        d: [{
          e?: string;
        }];
      }>();

    });

    it("should make only selected keys required", () => {

      type TestType = {
        a?: string;
        b?: {
          c?: string;
        };
        d?: string;
        e?: {
          f?: string;
        };
      };

      expectTypeOf<DeepRequiredByKey<TestType, "a" | "b" | "c">>().toEqualTypeOf<{
        a: string;
        b: {
          c: string;
        };
        d?: string;
        e?: {
          f?: string;
        };
      }>();

    });

    it("should not collapse tuples to arrays", () => {

      type TestType = {
        a?: ["hello", "world"];
        b?: {
          c?: [{
            d?: string;
          }];
        };
      };

      expectTypeOf<DeepRequiredByKey<TestType>>().toEqualTypeOf<{
        a: ["hello", "world"];
        b: {
          c: [{
            d: string;
          }];
        };
      }>();

    });

  });

  describe("DeepPartialByKey", () => {

    it("should make deeply nested properties optional", () => {

      type TestType = {
        a: string;
        b: {
          c: string;
        };
      };

      expectTypeOf<DeepPartialByKey<TestType>>().toEqualTypeOf<{
        a?: string;
        b?: {
          c?: string;
        };
      }>();

    });

    it("should be possible to make it shallow", () => {

      type TestType = {
        a: string;
        b: {
          c: string;
        };
        d: [{
          e: string;
        }];
      };

      expectTypeOf<DeepPartialByKey<TestType, PropertyKey, false>>().toEqualTypeOf<{
        a?: string;
        b?: {
          c: string;
        };
        d?: [{
          e: string;
        }];
      }>();

    });

    it("should make only selected keys required", () => {

      type TestType = {
        a: string;
        b: {
          c: string;
        };
        d: string;
        e: {
          f: string;
        };
      };

      expectTypeOf<DeepPartialByKey<TestType, "d" | "e" | "f">>().toEqualTypeOf<{
        a: string;
        b: {
          c: string;
        };
        d?: string;
        e?: {
          f?: string;
        };
      }>();

    });

    it("should not collapse tuples to arrays", () => {

      type TestType = {
        a: ["hello", "world"];
        b: {
          c: [{
            d: string;
          }];
        };
      };

      expectTypeOf<DeepPartialByKey<TestType>>().toEqualTypeOf<{
        a?: ["hello", "world"];
        b?: {
          c?: [{
            d?: string;
          }];
        };
      }>();

    });

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

});
