import { assert } from "./general";

import type { DefaultNodeContext } from "unwritten:type-definitions/context";


/**
 * Finds a file in a directory or its parent directories.
 *
 * @param ctx The render context.
 * @param fileName Name or array of names of the file to find.
 * @param entryPath Entry point for the search to begin.
 * @returns The absolute file path of the first file found, otherwise undefined.
 * @throws { Error } Throws an error if the entry path does not exist.
 */
export function findFile(ctx: DefaultNodeContext, fileName: string[] | string, entryPath?: string): string | undefined {

  const { existsSync } = ctx.dependencies.fs;
  const { absolute, join } = ctx.dependencies.path;
  const { cwd } = ctx.dependencies.process;

  entryPath ??= cwd();

  if(typeof fileName === "object" && Array.isArray(fileName) === true){
    for(const name of fileName){
      const found = findFile(ctx, name, entryPath);
      if(found !== undefined){
        return found;
      }
    }
    return;
  }

  assert(typeof fileName === "string", "fileName must be a string or an array of strings.");

  const absoluteEntryDir = absolute(entryPath);
  if(existsSync(absoluteEntryDir) === false){
    throw new Error(`Entry path does not exist: ${absoluteEntryDir}`);
  }

  const absoluteFilePath = join(absoluteEntryDir, fileName);
  if(existsSync(absoluteFilePath) === true){
    return absoluteFilePath;
  }

  const absoluteParentPath = absolute(absoluteEntryDir, "../");
  if(absoluteParentPath === absoluteEntryDir){
    return undefined;
  }

  return findFile(ctx, fileName, absoluteParentPath);

}
