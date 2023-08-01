import { describe, expect, it } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";

import {
  absolute,
  extractRoot,
  getDirectory,
  getFileExtension,
  getFileName,
  join,
  normalize,
  relative
} from "./shared.js";


scope("Integration", "path", () => {

  const posix = {
    cwd: () => "/current/directory/",
    homeDirectory: () => "/home/directory/",
    isAbsolute: (path: string) => path.startsWith("/"),
    separator: "/"
  };

  const dos = {
    cwd: () => "C:\\current\\directory\\",
    homeDirectory: () => "C:\\home\\directory\\",
    isAbsolute: (path: string) => path.startsWith("C:\\") || path.startsWith("\\"),
    separator: "\\"
  };

  const unc = {
    cwd: () => "\\\\current\\directory\\",
    homeDirectory: () => "\\\\home\\directory\\",
    isAbsolute: (path: string) => path.startsWith("\\\\"),
    separator: "\\"
  };


  describe("getAbsoluteRoot", () => {

    it("should return the directory including the trailing slash", () => {
      expect(extractRoot(posix, "/some/directory/file.txt")).toStrictEqual({ pathWithoutRoot: "some/directory/file.txt", root: "/" });
      expect(extractRoot(dos, "\\some\\directory\\file.txt")).toStrictEqual({ pathWithoutRoot: "some\\directory\\file.txt", root: "\\" });
      expect(extractRoot(dos, "C:\\some\\directory\\file.txt")).toStrictEqual({ pathWithoutRoot: "some\\directory\\file.txt", root: "C:\\" });
      expect(extractRoot(unc, "\\\\some\\directory\\file.txt")).toStrictEqual({ pathWithoutRoot: "some\\directory\\file.txt", root: "\\\\" });
    });

  });

  describe("getDirectory", () => {

    it("should return the directory including the trailing slash", () => {
      expect(getDirectory(posix, "/some/directory/file.txt")).toBe("/some/directory/");
      expect(getDirectory(dos, "\\some\\directory\\file.txt")).toBe("\\some\\directory\\");
      expect(getDirectory(unc, "\\\\some\\directory\\file.txt")).toBe("\\\\some\\directory\\");
    });

  });

  describe("getFileName", () => {

    it("should return the filename including the file extension", () => {
      expect(getFileName(posix, "/some/directory/file.txt")).toBe("file.txt");
      expect(getFileName(dos, "\\some\\directory\\file.txt")).toBe("file.txt");
      expect(getFileName(unc, "\\\\some\\directory\\file.txt")).toBe("file.txt");
    });

    it("should return the filename excluding the file extension", () => {
      expect(getFileName(posix, "/some/directory/file.txt", false)).toBe("file");
      expect(getFileName(dos, "\\some\\directory\\file.txt", false)).toBe("file");
      expect(getFileName(unc, "\\\\some\\directory\\file.txt", false)).toBe("file");
    });

  });

  describe("getFileExtension", () => {

    it("should return the file extension", () => {
      expect(getFileExtension(posix, "/some/directory/file.txt")).toBe(".txt");
      expect(getFileExtension(dos, "\\some\\directory\\file.txt")).toBe(".txt");
      expect(getFileExtension(unc, "\\\\some\\directory\\file.txt")).toBe(".txt");
    });

  });

  describe("absolute", () => {

    it("should be able to handle parent directories in a path", () => {
      expect(absolute(posix, "/some/directory/../", "/some/directory/../file.txt")).toBe("/some/file.txt");
      expect(absolute(dos, "C:\\some\\directory\\..\\", "C:\\some\\directory\\..\\file.txt")).toBe("C:\\some\\file.txt");
      expect(absolute(unc, "\\\\some\\directory\\..\\", "\\\\some\\directory\\..\\file.txt")).toBe("\\\\some\\file.txt");
    });

    it("should resolve from an absolute path to a relative path", () => {
      expect(absolute(posix, "/some/directory/file.txt", "../other/directory/file.txt")).toBe("/some/other/directory/file.txt");
      expect(absolute(dos, "C:\\some\\directory\\file.txt", "..\\other\\directory\\file.txt")).toBe("C:\\some\\other\\directory\\file.txt");
      expect(absolute(unc, "\\\\some\\directory\\file.txt", "..\\other\\directory\\file.txt")).toBe("\\\\some\\other\\directory\\file.txt");
    });

    it("should resolve from a relative path to a relative path", () => {
      expect(absolute(posix, "./some/directory/file.txt", "../other/directory/file.txt")).toBe("/current/directory/some/other/directory/file.txt");
      expect(absolute(dos, ".\\some\\directory\\file.txt", "..\\other\\directory\\file.txt")).toBe("C:\\current\\directory\\some\\other\\directory\\file.txt");
      expect(absolute(unc, ".\\some\\directory\\file.txt", "..\\other\\directory\\file.txt")).toBe("\\\\current\\directory\\some\\other\\directory\\file.txt");
    });

    it("should handle paths going beyond the root directory correctly", () => {
      expect(absolute(posix, "/file.txt", "../../file.txt")).toBe("/file.txt");
      expect(absolute(dos, "C:\\file.txt", "..\\..\\file.txt")).toBe("C:\\file.txt");
      expect(absolute(unc, "\\\\file.txt", "..\\..\\file.txt")).toBe("\\\\file.txt");
    });

  });

  describe("relative", () => {

    it("should resolve from an absolute path to an absolute path", () => {
      expect(relative(posix, "/some/directory/file.txt", "/some/other/directory/file.txt")).toBe("../other/directory/file.txt");
      expect(relative(dos, "C:\\some\\directory\\file.txt", "C:\\some\\other\\directory\\file.txt")).toBe("..\\other\\directory\\file.txt");
      expect(relative(unc, "\\\\some\\directory\\file.txt", "\\\\some\\other\\directory\\file.txt")).toBe("..\\other\\directory\\file.txt");
    });

    it("should resolve from an absolute path to a relative path", () => {
      expect(relative(posix, "/some/directory/file.txt", "./other-file.txt")).toBe("./other-file.txt");
      expect(relative(dos, "C:\\some\\directory\\file.txt", ".\\other-file.txt")).toBe(".\\other-file.txt");
      expect(relative(unc, "\\\\some\\directory\\file.txt", ".\\other-file.txt")).toBe(".\\other-file.txt");
    });

    it("should resolve from a relative path to a relative path", () => {
      expect(relative(posix, "./file.txt", "./other-file.txt")).toBe("./other-file.txt");
      expect(relative(dos, ".\\file.txt", ".\\other-file.txt")).toBe(".\\other-file.txt");
      expect(relative(unc, ".\\file.txt", ".\\other-file.txt")).toBe(".\\other-file.txt");
    });

    it("should resolve from a relative path to a parent relative path", () => {
      expect(relative(posix, "./file.txt", "../other-file.txt")).toBe("../other-file.txt");
      expect(relative(dos, ".\\file.txt", "..\\other-file.txt")).toBe("..\\other-file.txt");
      expect(relative(unc, ".\\file.txt", "..\\other-file.txt")).toBe("..\\other-file.txt");
    });

  });

  describe("join", () => {

    it("should join an absolute path and a relative path", () => {
      expect(join(posix, "/some/directory/", "./file.txt")).toBe("/some/directory/file.txt");
      expect(join(dos, "C:\\some\\directory\\", ".\\file.txt")).toBe("C:\\some\\directory\\file.txt");
      expect(join(unc, "\\\\some\\directory\\", ".\\file.txt")).toBe("\\\\some\\directory\\file.txt");
    });

    it("should join a relative path and a relative path", () => {
      expect(join(posix, "./some/", "./directory/file.txt")).toBe("some/directory/file.txt");
      expect(join(dos, ".\\some\\", ".\\directory\\file.txt")).toBe("some\\directory\\file.txt");
      expect(join(unc, ".\\some\\", ".\\directory\\file.txt")).toBe("some\\directory\\file.txt");
    });

    it("should override previous absolute paths", () => {
      expect(join(posix, "/some/directory/", "/other/directory/file.txt")).toBe("/other/directory/file.txt");
      expect(join(dos, "C:\\some\\directory\\", "C:\\other\\directory\\file.txt")).toBe("C:\\other\\directory\\file.txt");
      expect(join(unc, "\\\\some\\directory\\", "\\\\other\\directory\\file.txt")).toBe("\\\\other\\directory\\file.txt");
    });

    it("should override previous files", () => {
      expect(join(posix, "/some/directory/file.txt", "other-file.txt")).toBe("/some/directory/other-file.txt");
      expect(join(dos, "C:\\some\\directory\\file.txt", "other-file.txt")).toBe("C:\\some\\directory\\other-file.txt");
      expect(join(unc, "\\\\some\\directory\\file.txt", "other-file.txt")).toBe("\\\\some\\directory\\other-file.txt");
    });

    it("should be able to go to parent directories", () => {
      expect(join(posix, "/some/directory/", "../other/directory/file.txt")).toBe("/some/other/directory/file.txt");
      expect(join(dos, "C:\\some\\directory\\", "..\\other\\directory\\file.txt")).toBe("C:\\some\\other\\directory\\file.txt");
      expect(join(unc, "\\\\some\\directory\\", "..\\other\\directory\\file.txt")).toBe("\\\\some\\other\\directory\\file.txt");
    });

  });

  describe("normalize", () => {

    it("should remove protocols", () => {
      expect(normalize(posix, "file:///some/directory/file.txt")).toBe("/some/directory/file.txt");
      expect(normalize(dos, "file://C:/some/directory/file.txt")).toBe("C:\\some\\directory\\file.txt");
      expect(normalize(unc, "file://\\\\some\\directory\\file.txt")).toBe("\\\\some\\directory\\file.txt");
    });

    it("should remove double separators", () => {
      expect(normalize(posix, "/some//directory/file.txt")).toBe("/some/directory/file.txt");
      expect(normalize(dos, "C:\\some\\\\directory\\file.txt")).toBe("C:\\some\\directory\\file.txt");
      expect(normalize(unc, "\\\\some\\\\directory\\file.txt")).toBe("\\\\some\\directory\\file.txt");
    });

    it("should normalize mixed separators", () => {
      expect(normalize(posix, "/some\\directory/file.txt")).toBe("/some/directory/file.txt");
      expect(normalize(dos, "C:\\some\\directory/file.txt")).toBe("C:\\some\\directory\\file.txt");
      expect(normalize(unc, "\\\\some\\directory/file.txt")).toBe("\\\\some\\directory\\file.txt");
    });

    it("should remove additional leading slashes on windows", () => {
      expect(normalize(posix, "//some/directory/file.txt")).toBe("/some/directory/file.txt");
      expect(normalize(dos, "\\C:\\some\\directory\\file.txt")).toBe("C:\\some\\directory\\file.txt");
      expect(normalize(dos, "/C:\\some\\directory\\file.txt")).toBe("C:\\some\\directory\\file.txt");
      expect(normalize(unc, "/\\\\some\\directory\\file.txt")).toBe("\\\\some\\directory\\file.txt");
      expect(normalize(unc, "\\\\\\some\\directory\\file.txt")).toBe("\\\\some\\directory\\file.txt");
    });

    it("should be able to extract the root with invalid separators", () => {
      expect(normalize(posix, "\\some\\directory/file.txt")).toBe("/some/directory/file.txt");
      expect(normalize(dos, "/some/directory\\file.txt")).toBe("\\some\\directory\\file.txt");
      expect(normalize(dos, "C:/some/directory\\file.txt")).toBe("C:\\some\\directory\\file.txt");
    });

  });


  //


  it("should return the directory with a trailing slash", () => {
    expect(getDirectory(posix, "/some/directory/file.txt")).toBe("/some/directory/");
    expect(getDirectory(posix, "/some/directory/")).toBe("/some/directory/");
    expect(getDirectory(posix, "/some/directory")).toBe("/some/");
    expect(getDirectory(posix, "/")).toBe("/");
    expect(getDirectory(posix, "")).toBe("");
    expect(getDirectory(posix, "./some/directory/file.txt")).toBe("./some/directory/");
    expect(getDirectory(posix, "./some/directory/")).toBe("./some/directory/");
    expect(getDirectory(posix, "./some/directory")).toBe("./some/");
    expect(getDirectory(posix, "./")).toBe("./");
  });

  it("should return the file name including the extension", () => {
    expect(getFileName(posix, "/some/directory/file.txt")).toBe("file.txt");
    expect(getFileName(posix, "/some/directory/")).toBe("");
    expect(getFileName(posix, "/some/directory")).toBe("directory");
    expect(getFileName(posix, "/")).toBe("");
    expect(getFileName(posix, "")).toBe("");
    expect(getFileName(posix, "./some/directory/file.txt")).toBe("file.txt");
  });

  it("should return the file extension", () => {
    expect(getFileExtension(posix, "/some/directory/file.txt")).toBe(".txt");
    expect(getFileExtension(posix, "/some/directory/file.test.txt")).toBe(".txt");
    expect(getFileExtension(posix, "file.test.txt")).toBe(".txt");
    expect(getFileExtension(posix, "file.txt")).toBe(".txt");
    expect(getFileExtension(posix, "/some/directory/")).toBe("");
    expect(getFileExtension(posix, "/some/directory")).toBe("");
    expect(getFileExtension(posix, "/")).toBe("");
    expect(getFileExtension(posix, "")).toBe("");
    expect(getFileExtension(posix, "./some/directory/file.txt")).toBe(".txt");
  });

  it("should keep windows style paths as is", () => {
    expect(normalize(dos, "C:\\some\\directory\\file.txt")).toBe("C:\\some\\directory\\file.txt");
  });

  it("should strip file protocol prefix", () => {
    expect(normalize(posix, "file:///some/directory/file.txt")).toBe("/some/directory/file.txt");
  });

  it("should resolve the relative path from one file to another", () => {
    expect(relative(posix, "/some/directory/file.txt", "/some/other/directory/file.txt")).toBe("../other/directory/file.txt");
    expect(relative(posix, "/some/directory/file.txt", "/some/directory/file.txt")).toBe("./file.txt");
    expect(relative(posix, "/some/directory/file.txt", "/some/directory/other-file.txt")).toBe("./other-file.txt");
    expect(relative(posix, "./some/directory/file.txt", "./some/directory/other-file.txt")).toBe("./other-file.txt");
    expect(relative(posix, "/some/directory/file.txt", "../other/directory/")).toBe("../other/directory/");
  });

  it("should resolve the absolute path", () => {
    expect(absolute(posix, "/some/directory/file.txt", "../other/directory/file.txt")).toBe("/some/other/directory/file.txt");
    expect(absolute(posix, "/some/directory/file.txt", "/some/directory/other-file.txt")).toBe("/some/directory/other-file.txt");
    expect(absolute(posix, "/some/directory/file.txt", "./some/directory/other-file.txt")).toBe("/some/directory/some/directory/other-file.txt");
    expect(absolute(posix, "/some/directory/file.txt", "../other/directory/")).toBe("/some/other/directory/");
    expect(absolute(posix, "/some/directory/file.txt", "../")).toBe("/some/");
    expect(absolute(posix, posix.cwd(), "file.txt")).toBe(`${posix.cwd()}file.txt`);
    expect(absolute(posix, posix.cwd(), "/file.txt")).toBe("/file.txt");
    expect(absolute(posix, posix.cwd(), "./file.txt")).toBe(`${posix.cwd()}file.txt`);
    expect(absolute(posix, "~", "../../file.txt")).toBe("/file.txt");
    expect(absolute(posix, "/", "../file.txt")).toBe("/file.txt");
  });

  it("should join multiple segments", () => {
    expect(join(posix, "/some/directory/", "some/file.txt")).toBe("/some/directory/some/file.txt");
    expect(join(posix, "/some/directory/", "some/file.txt")).toBe("/some/directory/some/file.txt");
    expect(join(posix, "/some/directory/", "/some/file.txt")).toBe("/some/file.txt");
    expect(join(posix, "/some/directory/", "./some/file.txt")).toBe("/some/directory/some/file.txt");
    expect(join(posix, "some/directory/", "./some/file.txt")).toBe("some/directory/some/file.txt");
    expect(join(posix, "./some/directory/", "./some/file.txt")).toBe("some/directory/some/file.txt");
  });

});
