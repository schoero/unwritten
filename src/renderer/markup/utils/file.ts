import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { FilePath } from "unwritten:type-definitions/file-system.js";


const MAX_IDENTICAL_FILE_NAMES = 10;
const MAX_FILENAME_LENGTH = 255;


export function getAvailableFileName(ctx: RenderContext, filePath: FilePath): FilePath {

  const { existsSync } = ctx.dependencies.fs;
  const { getDirectory, getFileExtension, getFileName, join } = ctx.dependencies.path;

  const directory = getDirectory(filePath);
  const fileExtension = getFileExtension(filePath);
  const fileNameWithoutExtension = getFileName(filePath).replace(fileExtension, "");

  // eslint-disable-next-line no-control-regex
  const invalidCharsRegex = /[\s\x00-\x1F"*/:<>?\\|]/g;

  const validFileNameWithoutExtension = fileNameWithoutExtension.replace(invalidCharsRegex, "-")
    .replace(/--+/g, "-")
    .substring(0, MAX_FILENAME_LENGTH);

  const validPath = join(directory, `${validFileNameWithoutExtension}${fileExtension}`) as FilePath;

  if(!existsSync(validPath)){
    return validPath;
  }

  for(let i = 2; i < MAX_IDENTICAL_FILE_NAMES; i++){
    const validPath = join(directory, `${validFileNameWithoutExtension}-${i}${fileExtension}`) as FilePath;
    if(!existsSync(validPath)){
      return validPath;
    }
  }

  throw new RangeError(`Could not find a valid file name for ${filePath}`);

}

export function getOutputFilePath(ctx: RenderContext, filePath: string): FilePath {

  const { getFileName, join } = ctx.dependencies.path;

  const fileName = getFileName(filePath, false);
  const fileExtension = ctx.renderer.fileExtension;
  const config = ctx.config;

  const outputDir = config.outputDir;
  const outputPath = join(outputDir, `${fileName}${fileExtension}`) as FilePath;

  return getAvailableFileName(ctx, outputPath);

}
