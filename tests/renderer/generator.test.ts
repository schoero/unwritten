import { statSync, writeFileSync } from "fs";
import { describe, expect, it } from "vitest";

import { setConfig } from "../../src/config/index.js";
import { parse } from "../../src/parser/index.js";
import { compile } from "../utils/compile.js";


setConfig({
  renderConfig: {
    parameterEncapsulation: false,
    stringLiteralTypeEncapsulation: false,
    tagEncapsulation: false,
    typeEncapsulation: false
  }
});

describe("Generator", function() {

  const testFileContent = `
    export function testFunction() {
      return "test";
    }
  `;

  const { fileSymbol } = compile(testFileContent.trim());
  const thing = parse(fileSymbol);

  function replacer(key: string, value: any) {
    if(key === "id"){
      return undefined;
    }
    if(key === "kind"){
      const firstLetter = value[0].toUpperCase();
      const rest = value.slice(1);
      return `EntityKind.${firstLetter}${rest}`;
    }

    return value;
  }

  writeFileSync("temp.json", JSON.stringify(thing, replacer, 2));

  it("should have generated a json file", () => {
    expect(statSync("temp.json").isFile()).toBe(true);
  });

});