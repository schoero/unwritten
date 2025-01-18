import { scope } from "unwritten:tests:utils/scope";
import { expectTypeOf, test } from "vitest";

import type { TranslationWithoutSuffixes } from "./translations";


scope("Types", "Translations", () => {

  test("TranslationWithoutSuffixes", () => {

    type TestType = {
      name_many?: string;
      name_one?: string;
    };

    expectTypeOf<TranslationWithoutSuffixes<keyof TestType>>().toEqualTypeOf<"name">();

  });

});
