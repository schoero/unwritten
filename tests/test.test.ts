import { existsSync, writeFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";

import { parse } from "../src/compiler/entry-points/index.js";


describe("Compiler: Namespace", () => {

  const testFileContent = 'export const stringLiteralType: `${string}: ${number}` = "the meaning of life: 42"';

  const { fileSymbol, ctx } = compile(testFileContent);

  const thing = parse(ctx, fileSymbol);

  writeFileSync("thing.json", JSON.stringify(thing, (key, value) => {
    if(key === "kind"){
      return `Kind.${value as number}`;
    } else if(key === "id"){
      return;
    } else if(key === "modifiers"){
      return;
    } else if(key === "position"){
      return;
    }
    return value;
  }, 2).replace(/"(Kind\..*)"/g, "$1"));

  it("should export a thing", () => {
    expect(existsSync("thing.json")).toBe(true);
  });

});
