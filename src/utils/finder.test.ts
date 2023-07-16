import { mkdirSync, writeFileSync } from "node:fs";

import { afterEach, beforeAll, expect, it, vitest } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";
import { findFile } from "unwritten:utils/finder.js";
import { clearVirtualFS } from "unwritten:utils/virtual-fs.js";


scope("Integration", "finder", async () => {

  beforeAll(() => {
    vitest.mock("node:fs", async () => import("./virtual-fs.js"));
    return () => vitest.restoreAllMocks();
  });

  afterEach(() => {
    clearVirtualFS();
  });

  it("should find a file in the entry directory", async () => {
    writeFileSync(".unwritten.json", "{}");
    const file = findFile(".unwritten.json", "/");
    expect(file).toBe("/.unwritten.json");
  });

  it("should find a file in the current working directory", async () => {
    const cwd = process.cwd();
    mkdirSync(cwd, { recursive: true });
    writeFileSync(`${cwd}/.unwritten.json`, "{}");
    const file = findFile(".unwritten.json");
    expect(file).toBe(`${cwd}/.unwritten.json`);
  });

  it("should find a file in a parent directory", async () => {
    const cwd = process.cwd();
    mkdirSync(cwd, { recursive: true });
    writeFileSync(".unwritten.json", "{}");
    const file = findFile(".unwritten.json", cwd);
    expect(file).toBe("/.unwritten.json");
  });

});
