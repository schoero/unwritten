import { afterEach, beforeAll, expect, it, vitest } from "vitest";

import { generateConfig } from "unwritten:config/generator.entry.js";
import { clearVirtualFS, existsSync } from "unwritten:platform/file-system/virtual-fs.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Integration", "generateConfig", () => {

  beforeAll(() => {
    vitest.mock("node:fs", async () => import("unwritten:platform/file-system/virtual-fs.js"));
    return () => vitest.restoreAllMocks();
  });

  afterEach(() => {
    clearVirtualFS();
  });

  {

    it("should create a config file at the current working directory", async () => {
      await generateConfig(undefined, { silent: true });
      expect(existsSync(".unwritten.json")).toBe(true);
    });

    it("should create a config file at the provided location", async () => {
      const path = "/some/random/path/.unwritten.json";
      await generateConfig(path, { silent: true });
      expect(existsSync(`${path}`)).toBe(true);
    });

  }

});
