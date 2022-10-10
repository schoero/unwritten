import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { error } from "../log/index.js";


/**
 * Finds a file in a directory or its parent directories.
 * @param fileName Name of the file to find.
 * @param entryPath Entry point for the search to begin.
 * @returns The absolute file path if found, otherwise undefined.
 */
export function findFile(fileName: string, entryPath?: string): string | undefined {

  if(entryPath === undefined){
    entryPath = process.cwd();
  }

  const absoluteEntryPath = resolve(entryPath);
  if(existsSync(absoluteEntryPath) === false){
    throw error(`Entry path does not exist: ${absoluteEntryPath}`);
  }

  const absoluteFilePath = resolve(absoluteEntryPath, fileName);
  if(existsSync(absoluteFilePath) === true){
    return absoluteFilePath;
  }

  const absoluteParentPath = dirname(absoluteEntryPath);
  if(absoluteParentPath === absoluteEntryPath){
    return undefined;
  }

  return findFile(fileName, absoluteParentPath);

}