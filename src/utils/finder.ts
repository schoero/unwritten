import { existsSync } from "node:fs";
import { dirname, parse, resolve } from "node:path";

import { error } from "../log/index.js";
import { assert } from "./general.js";


/**
 * Finds a file in a directory or its parent directories.
 * @param fileName - Name or array of names of the file to find.
 * @param entryPath - Entry point for the search to begin.
 * @returns The absolute file path of the first file found, otherwise undefined.
 */
export function findFile(fileName: string[] | string, entryPath?: string): string | undefined {

  if(typeof fileName === "object" && Array.isArray(fileName) === true){
    for(const name of fileName){
      const found = findFile(name, entryPath);
      if(found !== undefined){
        return found;
      }
    }
    return;
  }

  assert(typeof fileName === "string", "fileName must be a string or an array of strings.");

  if(entryPath === undefined){
    entryPath = process.cwd();
  }

  const absoluteEntryDir = parse(resolve(entryPath)).dir;
  if(existsSync(absoluteEntryDir) === false){
    throw error(`Entry path does not exist: ${absoluteEntryDir}`);
  }

  const absoluteFilePath = resolve(absoluteEntryDir, fileName);
  if(existsSync(absoluteFilePath) === true){
    return absoluteFilePath;
  }

  const absoluteParentPath = dirname(absoluteEntryDir);
  if(absoluteParentPath === absoluteEntryDir){
    return undefined;
  }

  return findFile(fileName, absoluteParentPath);

}
