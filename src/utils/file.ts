import type { DefaultContext } from "unwritten:type-definitions/context.js";
import type { FileName } from "unwritten:type-definitions/file-system.js";


const MAX_IDENTICAL_FILE_NAMES = 10;
const MAX_FILENAME_LENGTH = 255;


export function getValidFileName(ctx: DefaultContext, fileName: FileName): FileName {

  const { fs } = ctx.dependencies;
  const { existsSync } = fs;

  const directory = fileName.slice(0, fileName.lastIndexOf("/") + 1);
  const fileExtension = fileName.split(".").pop() ?? "";
  const fileNameWithoutExtension = fileName.slice(directory.length, fileName.length - fileExtension.length - 1);

  // eslint-disable-next-line no-control-regex
  const invalidCharsRegex = /[\s\x00-\x1F"*/:<>?\\|]/g;

  const validFileNameWithoutExtension = fileNameWithoutExtension.replace(invalidCharsRegex, "-")
    .replace(/--+/g, "-")
    .substring(0, MAX_FILENAME_LENGTH);

  const validPath = `${directory}${validFileNameWithoutExtension}.${fileExtension}` as const;

  if(!existsSync(validPath)){
    return validPath;
  }

  for(let i = 2; i < MAX_IDENTICAL_FILE_NAMES; i++){
    const validPath = `${directory}${validFileNameWithoutExtension}-${i}.${fileExtension}` as const;
    if(!existsSync(validPath)){
      return validPath;
    }
  }

  throw new RangeError(`Could not find a valid file name for ${fileName}`);

}
