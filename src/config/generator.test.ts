import { existsSync } from "node:fs";

import { afterAll, afterEach, beforeAll, expect, it, vitest } from "vitest";

import { generateConfig } from "unwritten:config/generator.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { clearVirtualFS } from "unwritten:utils:virtual-fs.js";


scope("Integration", "generateConfig", () => {

  beforeAll(() => {
    vitest.mock("node:fs", async () => import("unwritten:utils:virtual-fs.js"));
  });

  afterEach(() => {
    clearVirtualFS();
  });

  afterAll(() => {
    vitest.resetAllMocks();
  });

  {

    it("should create a config file at the current working directory", async () => {
      await generateConfig();
      expect(existsSync(`${process.cwd()}/.unwritten.json`)).toBe(true);
    });

    it("should create a config file at the provided location", async () => {
      const path = "some/random/path/.unwritten.json";
      await generateConfig(path);
      expect(existsSync(`${process.cwd()}/${path}`)).toBe(true);
    });

  }

});
