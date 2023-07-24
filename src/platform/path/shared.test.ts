import { expect, it } from "vitest";

import {
  absolute,
  getDirectory,
  getFileExtension,
  getFileName,
  join,
  normalize,
  relative
} from "unwritten:platform/path/browser.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Integration", "path", () => {

  it("should return the directory without a trailing slash", () => {
    expect(getDirectory("/some/directory/file.txt")).toBe("/some/directory");
    expect(getDirectory("/some/directory/")).toBe("/some/directory");
    expect(getDirectory("/some/directory")).toBe("/some");
    expect(getDirectory("/")).toBe("/");
    expect(getDirectory("")).toBe("");
    expect(getDirectory("./some/directory/file.txt")).toBe("./some/directory");
    expect(getDirectory("./some/directory/")).toBe("./some/directory");
    expect(getDirectory("./some/directory")).toBe("./some");
    expect(getDirectory("./")).toBe("./");
  });

  it("should return the file name including the extension", () => {
    expect(getFileName("/some/directory/file.txt")).toBe("file.txt");
    expect(getFileName("/some/directory/")).toBe("");
    expect(getFileName("/some/directory")).toBe("directory");
    expect(getFileName("/")).toBe("");
    expect(getFileName("")).toBe("");
    expect(getFileName("./some/directory/file.txt")).toBe("file.txt");
  });

  it("should return the file extension", () => {
    expect(getFileExtension("/some/directory/file.txt")).toBe(".txt");
    expect(getFileExtension("/some/directory/file.test.txt")).toBe(".txt");
    expect(getFileExtension("file.test.txt")).toBe(".txt");
    expect(getFileExtension("file.txt")).toBe(".txt");
    expect(getFileExtension("/some/directory/")).toBe("");
    expect(getFileExtension("/some/directory")).toBe("");
    expect(getFileExtension("/")).toBe("");
    expect(getFileExtension("")).toBe("");
    expect(getFileExtension("./some/directory/file.txt")).toBe(".txt");
  });

  it("should normalize windows style paths to posix style paths", () => {
    expect(normalize("C:\\some\\directory\\file.txt")).toBe("C:/some/directory/file.txt");
  });

  it("should strip file protocol prefix", () => {
    expect(normalize("file:///some/directory/file.txt")).toBe("/some/directory/file.txt");
  });

  it("should resolve the relative path from one file to another", () => {
    expect(relative("/some/directory/file.txt", "/some/other/directory/file.txt")).toBe("../other/directory/file.txt");
    expect(relative("/some/directory/file.txt", "/some/directory/file.txt")).toBe("./file.txt");
    expect(relative("/some/directory/file.txt", "/some/directory/other-file.txt")).toBe("./other-file.txt");
    expect(relative("./some/directory/file.txt", "./some/directory/other-file.txt")).toBe("./other-file.txt");
    expect(relative("/some/directory/file.txt", "../other/directory/")).toBe("../other/directory/");
  });

  it("should resolve the absolute path", () => {
    expect(absolute("/some/directory/file.txt", "../other/directory/file.txt")).toBe("/some/other/directory/file.txt");
    expect(absolute("/some/directory/file.txt", "/some/directory/other-file.txt")).toBe("/some/directory/other-file.txt");
    expect(absolute("/some/directory/file.txt", "./some/directory/other-file.txt")).toBe("/some/directory/some/directory/other-file.txt");
    expect(absolute("/some/directory/file.txt", "../other/directory/")).toBe("/some/other/directory/");
    expect(absolute("/some/directory/file.txt", "../")).toBe("/some/");
    expect(absolute("file.txt")).toBe("/file.txt");
    expect(absolute("/file.txt")).toBe("/file.txt");
    expect(absolute("./file.txt")).toBe("/file.txt");
  });

  it("should join multiple segments", () => {
    expect(join("/some/directory/", "some/file.txt")).toBe("/some/directory/some/file.txt");
    expect(join("/some/directory/", "some/file.txt")).toBe("/some/directory/some/file.txt");
    expect(join("/some/directory/", "/some/file.txt")).toBe("/some/directory/some/file.txt");
    expect(join("/some/directory/", "./some/file.txt")).toBe("/some/directory/some/file.txt");
    expect(join("some/directory/", "./some/file.txt")).toBe("some/directory/some/file.txt");
    expect(join("./some/directory/", "./some/file.txt")).toBe("some/directory/some/file.txt");
  });

});
