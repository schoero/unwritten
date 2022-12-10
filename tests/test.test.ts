import { existsSync, writeFileSync } from "fs";

import { describe, expect, it } from "vitest";

import { parse } from "../src/compiler/entry-points/index.js";

import { compile } from "./utils/compile.js";


describe("Compiler: Namespace", () => {

  const testFileContent = 'export const stringLiteralType: `${string}: ${number}` = "the meaning of life: 42"';

  const { fileSymbol, ctx } = compile(testFileContent);

  const thing = parse(ctx, fileSymbol);

  writeFileSync("thing.json", JSON.stringify(thing, (key, value) => {
    if(key === "kind"){
      return `Kind.${value as number}`;
    } else if(key === "id"){
      return undefined;
    } else if(key === "modifiers"){
      return undefined;
    } else if(key === "position"){
      return undefined;
    } else {
      return value;
    }
  }, 2).replace(/"(Kind\..*)"/g, "$1"));

  it("should export a thing", () => {
    expect(existsSync("thing.json")).toBe(true);
  });

});
