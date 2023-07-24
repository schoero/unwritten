import { afterEach, beforeAll, expect, it, vitest } from "vitest";

import { mkdirSync, writeFileSync } from "unwritten:platform/file-system/node.js";
import { clearVirtualFS } from "unwritten:platform/file-system/virtual-fs.js";
import { cwd } from "unwritten:platform/process/node.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { findFile } from "unwritten:utils/finder.js";


scope("Integration", "finder", async () => {

  beforeAll(() => {
    vitest.mock("node:fs", async () => import("../platform/file-system/virtual-fs.js"));
    return () => vitest.restoreAllMocks();
  });

  afterEach(() => {
    clearVirtualFS();
  });

  const ctx = createRenderContext();

  it("should find a file in the entry directory", async () => {
    writeFileSync(".unwritten.json", "{}");
    const file = findFile(ctx, ".unwritten.json", "/");
    expect(file).toBe("/.unwritten.json");
  });

  it("should find a file in the current working directory", async () => {
    mkdirSync(cwd(), { recursive: true });
    writeFileSync(`${cwd()}/.unwritten.json`, "{}");
    const file = findFile(ctx, ".unwritten.json");
    expect(file).toBe(`${cwd()}/.unwritten.json`);
  });

  it("should find a file in a parent directory", async () => {
    mkdirSync(cwd(), { recursive: true });
    writeFileSync(".unwritten.json", "{}");
    const file = findFile(ctx, ".unwritten.json", cwd());
    expect(file).toBe("/.unwritten.json");
  });

});
