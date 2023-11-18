import { afterEach, describe, expect, it } from "vitest";

import { clearVirtualFS } from "unwritten:tests:utils/virtual-fs";
import { getAvailableFileName } from "unwritten:renderer/markup/utils/file";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";


scope("Renderer", "File utilities", () => {

  afterEach(() => {
    clearVirtualFS();
  });

  describe("getValidFileName", () => {

    const ctx = createRenderContext();

    it("should keep valid file names as is", () => {
      expect(getAvailableFileName(ctx, [], "valid-file-name.md")).toBe("valid-file-name.md");
      expect(getAvailableFileName(ctx, [], "valid_file_name.md")).toBe("valid_file_name.md");
      expect(getAvailableFileName(ctx, [], "my-gr8-valid-FileName.md")).toBe("my-gr8-valid-FileName.md");
    });

    it("should replace invalid characters with a dash", () => {
      expect(getAvailableFileName(ctx, [], "invalid file name.md")).toBe("invalid-file-name.md");
      expect(getAvailableFileName(ctx, [], "invalid*file:name.md")).toBe("invalid-file-name.md");
    });

    it("should find an alternative name if the file already exists", () => {
      expect(getAvailableFileName(ctx, [], "valid-file-name.md")).toBe("valid-file-name.md");
      expect(getAvailableFileName(ctx, ["valid-file-name.md"], "valid-file-name.md")).toBe("valid-file-name-2.md");
      expect(getAvailableFileName(ctx, ["valid-file-name.md", "valid-file-name-2.md"], "valid-file-name.md")).toBe("valid-file-name-3.md");
    });

  });

});
