import { writeFileSync } from "node:fs";
import { resolve } from "node:path/posix";

import { expect, it, vi } from "vitest";

import { getConfigWithSchema } from "unwritten:config/generator.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { init } from "./init.js";


scope("E2E", "init", () => {

  vi.mock("node:fs", async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const actual = await vi.importActual<typeof import("node:fs")>("node:fs");
    return {
      ...actual,
      existsSync: vi.fn().mockReturnValue(false),
      writeFileSync: vi.fn()
    };
  });

  {

    it("should create a config file at the current working directory", () => {
      init();
      expect(writeFileSync).toHaveBeenCalledWith(`${process.cwd()}/.unwritten.json`, JSON.stringify(getConfigWithSchema(), null, 2));
    });

    it("should create a config file at the provided location", () => {
      const path = "some/random/path/.unwritten.json";
      init(path);
      expect(writeFileSync).toHaveBeenCalledWith(`${resolve(path)}`, JSON.stringify(getConfigWithSchema(), null, 2));
    });

  }


});
