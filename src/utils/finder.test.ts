import { afterEach, beforeAll, expect, it, vitest } from "vitest";

import { clearVirtualFS } from "unwritten:platform/file-system/virtual-fs.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { findFile } from "unwritten:utils/finder.js";


scope("Integration", "finder", async () => {

  beforeAll(() => {
    vitest.mock("unwritten:platform/process/browser.js", async () => {
      const process = {
        cwd: () => "/some/random/path/"
      };
      return {
        cwd: process.cwd,
        default: process
      };
    });
    return () => vitest.restoreAllMocks();
  });

  afterEach(() => {
    clearVirtualFS();
  });

  const ctx = createRenderContext();

  const { mkdirSync, writeFileSync } = ctx.dependencies.fs;
  const { cwd } = ctx.dependencies.process;
  const { join } = ctx.dependencies.path;

  it("should find a file in the entry directory", async () => {
    writeFileSync(".unwritten.json", "{}");
    const file = findFile(ctx, ".unwritten.json", "/");
    expect(file).toBe("/.unwritten.json");
  });

  it("should find a file in the current working directory", async () => {
    mkdirSync(cwd(), { recursive: true });
    writeFileSync(join(cwd(), "/.unwritten.json"), "{}");
    const file = findFile(ctx, ".unwritten.json");
    expect(file).toBe(join(cwd(), "/.unwritten.json"));
  });

  it("should find a file in a parent directory", async () => {
    mkdirSync(cwd(), { recursive: true });
    writeFileSync(".unwritten.json", "{}");
    const file = findFile(ctx, ".unwritten.json", cwd());
    expect(file).toBe("/.unwritten.json");
  });

});
