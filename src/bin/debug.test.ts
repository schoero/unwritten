import { writeFileSync } from "node:fs";
import { resolve } from "node:path/posix";

import { expect, it, vi } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import { debug } from "./debug.js";


scope("E2E", "debug", () => {

  vi.mock("node:fs", async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const actual = await vi.importActual<typeof import("node:fs")>("node:fs");
    return {
      ...actual,
      existsSync: vi.fn().mockReturnValue(false),
      readFileSync: vi.fn().mockImplementation((path: string) => {
        if(path.endsWith("success.ts")){
          return ts`export const test: number = 7;`;
        } else {
          return ts`export error`;
        }
      }),
      writeFileSync: vi.fn().mockImplementation((path: string, content: string) => {
        console.log(path, content);
      })
    };
  });

  it("should create a log file at the specified directory", () => {
    const inputPath = "path/to/success.ts";
    const outputDir = "some/random/dir";
    debug(inputPath, outputDir);
    expect(writeFileSync).toHaveBeenCalledWith(`${resolve(process.cwd(), outputDir, "output.json")}`, expect.any(String));
  });

  it("should create a error file at the specified directory", () => {
    const inputPath = "path/to/error.ts";
    const outputDir = "some/random/dir";
    try {
      debug(inputPath, outputDir);
    } catch (err){
      expect(writeFileSync).toHaveBeenNthCalledWith(1, `${resolve(process.cwd(), outputDir, "output.json")}`, expect.any(String));
      expect(writeFileSync).toHaveBeenNthCalledWith(2, `${resolve(process.cwd(), outputDir, "error.json")}`, expect.any(String));
    }
  });

});
