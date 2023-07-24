import { afterEach, beforeAll, describe, expect, it, vitest } from "vitest";

import { writeFileSync } from "unwritten:platform/file-system/node.js";
import { clearVirtualFS } from "unwritten:platform/file-system/virtual-fs.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { getValidFileName } from "unwritten:utils/file.js";


scope("Renderer", "File utilities", () => {

  beforeAll(() => {
    vitest.mock("node:fs", async () => import("unwritten:platform/file-system/virtual-fs.js"));
    return () => vitest.restoreAllMocks();
  });

  afterEach(() => {
    clearVirtualFS();
  });


  describe("getValidFileName", () => {

    const ctx = createRenderContext();

    it("should keep valid file names as is", () => {
      expect(getValidFileName(ctx, "valid-file-name.md")).toBe("valid-file-name.md");
      expect(getValidFileName(ctx, "valid_file_name.md")).toBe("valid_file_name.md");
      expect(getValidFileName(ctx, "my-gr8-valid-FileName.md")).toBe("my-gr8-valid-FileName.md");
    });

    it("should replace invalid characters with a dash", () => {
      expect(getValidFileName(ctx, "invalid file name.md")).toBe("invalid-file-name.md");
      expect(getValidFileName(ctx, "invalid*file:name.md")).toBe("invalid-file-name.md");
      expect(getValidFileName(ctx, "invalid|file\\name.md")).toBe("invalid-file-name.md");
    });

    it("should find an alternative name if the file already exists", () => {
      expect(getValidFileName(ctx, "valid-file-name.md")).toBe("valid-file-name.md");
      writeFileSync("valid-file-name.md", "");
      expect(getValidFileName(ctx, "valid-file-name.md")).toBe("valid-file-name-2.md");
      writeFileSync("valid-file-name-2.md", "");
      expect(getValidFileName(ctx, "valid-file-name.md")).toBe("valid-file-name-3.md");
    });

    it("should handle directories correctly", () => {
      expect(getValidFileName(ctx, "valid-file-name.md")).toBe("valid-file-name.md");
      expect(getValidFileName(ctx, "/valid-file-name.md")).toBe("/valid-file-name.md");
      expect(getValidFileName(ctx, "some/directory/valid-file-name.md")).toBe("some/directory/valid-file-name.md");
      expect(getValidFileName(ctx, "/some/directory/valid-file-name.md")).toBe("/some/directory/valid-file-name.md");
    });

  });

});
