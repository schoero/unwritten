import { afterEach, beforeAll, describe, expect, it, vitest } from "vitest";

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "unwritten:platform/file-system/node";
import { clearVirtualFS } from "unwritten:platform/file-system/virtual-fs";


describe("virtual fs", () => {

  beforeAll(() => {
    vitest.mock("node:fs", async () => import("./virtual-fs.js"));
    return () => vitest.restoreAllMocks();
  });

  afterEach(() => {
    clearVirtualFS();
  });

  describe("writeFileSync", async () => {

    it("should not write to the local file system", async () => {
      writeFileSync("test.txt", "Hello World!");
      const { existsSync: originalExistSync } = await vitest.importActual<typeof import("node:fs")>("node:fs");
      expect(originalExistSync("test.txt")).toBe(false);
    });

    it("should write to the virtual file system", async () => {
      writeFileSync("test.txt", "Hello World!");
      expect(existsSync("test.txt")).toBe(true);
    });

    it("should remove the leading '/'", async () => {
      writeFileSync("/test.txt", "Hello World!");
      expect(existsSync("test.txt")).toBe(true);
    });

    it("should throw an error if the directory does not exist", async () => {
      expect(() => {
        writeFileSync("test/test.txt", "Hello World!");
      }).toThrow("ENOENT: no such file or directory, open 'test/test.txt'");
    });

    it("should throw an error if the file name is empty", async () => {
      expect(() => {
        writeFileSync("", "Hello World!");
      }).toThrow("ENOENT: no such file or directory, open ''");
      expect(() => {
        writeFileSync("test/", "Hello World!");
      }).toThrow("ENOENT: no such file or directory, open 'test/'");
    });

  });

  describe("readFileSync", async () => {

    it("should throw an error if the file does not exist", async () => {
      expect(() => {
        readFileSync("test.txt");
      }).toThrow("ENOENT: no such file or directory, open 'test.txt'");
    });

    it("should read from the virtual file system", async () => {
      writeFileSync("test.txt", "Hello World!");
      expect(readFileSync("test.txt")).toBe("Hello World!");
    });

  });

  describe("existsSync", async () => {

    it("should remove the leading '/'", async () => {
      writeFileSync("test.txt", "Hello World!");
      expect(existsSync("/test.txt")).toBe(true);
    });

    it("should return false if the file does not exist", async () => {
      expect(existsSync("test.txt")).toBe(false);
    });

    it("should return true if the file exists", async () => {
      writeFileSync("test.txt", "Hello World!");
      expect(existsSync("test.txt")).toBe(true);
    });

  });

  describe("mkdirSync", async () => {

    it("should create a directory", async () => {
      expect(existsSync("test")).toBe(false);
      mkdirSync("test");
      expect(existsSync("test")).toBe(true);
    });

    it("should throw an error if the parent directory does not exist and the recursive option is not set", async () => {
      expect(() => {
        mkdirSync("test/test");
      }).toThrow("ENOENT: no such file or directory, mkdir 'test/test'");
    });

    it("should create a directory recursively", async () => {
      expect(existsSync("test/test")).toBe(false);
      mkdirSync("test/test", { recursive: true });
      expect(existsSync("test/test")).toBe(true);
    });

  });

  describe("rmSync", async () => {

    it("should remove files", async () => {
      writeFileSync("test.txt", "Hello World!");
      expect(existsSync("test.txt")).toBe(true);
      rmSync("test.txt");
      expect(existsSync("test.txt")).toBe(false);
    });

    it("should remove directories", async () => {
      mkdirSync("test");
      expect(existsSync("test")).toBe(true);
      rmSync("test");
      expect(existsSync("test")).toBe(false);
    });

    it("should throw an error if the file does not exist", async () => {
      expect(() => {
        rmSync("test.txt");
      }).toThrow("ENOENT: no such file or directory, open 'test.txt'"); // Not original error message
    });

    it("should throw an error if the directory does not exist", async () => {
      expect(() => {
        rmSync("test");
      }).toThrow("ENOENT: no such file or directory, open 'test'"); // Not original error message
    });

    it("should throw an error if the directory is not empty", async () => {
      mkdirSync("test");
      writeFileSync("test/test.txt", "Hello World!");
      expect(() => {
        rmSync("test");
      }).toThrow("ENOTEMPTY: directory not empty, rmdir 'test'");
    });

    it("should remove directories recursively", async () => {
      mkdirSync("test");
      mkdirSync("test/test");
      writeFileSync("test/test/test.txt", "Hello World!");
      expect(existsSync("test/test/test.txt")).toBe(true);
      rmSync("test", { recursive: true });
      expect(existsSync("test/test/test.txt")).toBe(false);
      expect(existsSync("test/test")).toBe(false);
      expect(existsSync("test")).toBe(false);
    });

  });

  describe("readdirSync", async () => {

    it("should throw an error if the directory does not exist", async () => {
      expect(() => {
        readdirSync("test");
      }).toThrow("ENOTDIR: not a directory, scandir 'test'"); // Not original error message
    });

    it("should return an empty array if the directory is empty", async () => {
      mkdirSync("test");
      expect(readdirSync("test")).toEqual([]);
    });

    it("should return an array of file names", async () => {
      mkdirSync("test");
      writeFileSync("test/test.txt", "Hello World!");
      writeFileSync("test/test2.txt", "Hello World!");
      expect(readdirSync("test")).toEqual([
        "test.txt",
        "test2.txt"
      ]);
    });

    it("should return an array of file names recursively", async () => {
      mkdirSync("test");
      mkdirSync("test/test");
      writeFileSync("test/test/test.txt", "Hello World!");
      writeFileSync("test/test/test2.txt", "Hello World!");
      expect(readdirSync("test", { recursive: true })).toEqual([
        "test",
        "test/test.txt",
        "test/test2.txt"
      ]);
    });

  });

});
