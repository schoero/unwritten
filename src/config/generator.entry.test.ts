import { afterEach, beforeAll, expect, it, vitest } from "vitest";

import { generateConfig } from "unwritten:config/generator.entry";
import { scope } from "unwritten:tests:utils/scope";
import { clearVirtualFS, existsSync } from "unwritten:tests:utils/virtual-fs";


scope("Integration", "generateConfig", () => {

  beforeAll(() => {
    vitest.mock("unwritten:platform/file-system/node.js", async () => import("unwritten:tests:utils/virtual-fs"));
    vitest.mock("unwritten:platform/path/node.js", async () => import("unwritten:platform/path/browser.js"));
    vitest.mock("unwritten:platform/process/node.js", async () => import("unwritten:platform/process/browser.js"));
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
      expect(existsSync(path)).toBe(true);
    });

  }

});
