import type { SourceFileEntity } from "unwritten:interpreter:type-definitions/entities";
import type { RenderContext } from "unwritten:type-definitions/context";
import type { FilePath } from "unwritten:type-definitions/platform";


const MAX_IDENTICAL_FILE_NAMES = 10;
const MAX_FILENAME_LENGTH = 255;


export function getAvailableFileName(ctx: RenderContext, usedFilePaths: FilePath[], filePath: FilePath): FilePath {

  const { getDirectory, getFileExtension, getFileName, join } = ctx.dependencies.path;

  const directory = getDirectory(filePath);
  const fileExtension = getFileExtension(filePath);
  const fileNameWithoutExtension = getFileName(filePath).replace(fileExtension, "");

  const invalidCharsRegex = /[\s\x00-\x1F"*/:<>?\\|]/g;

  const validFileNameWithoutExtension = fileNameWithoutExtension.replace(invalidCharsRegex, "-")
    .replace(/--+/g, "-")
    .substring(0, MAX_FILENAME_LENGTH);

  const validPath = join(directory, `${validFileNameWithoutExtension}${fileExtension}`) as FilePath;

  if(!usedFilePaths.includes(validPath)){
    return validPath;
  }

  for(let i = 2; i < MAX_IDENTICAL_FILE_NAMES; i++){
    const validPath = join(directory, `${validFileNameWithoutExtension}-${i}${fileExtension}`) as FilePath;
    if(!usedFilePaths.includes(validPath)){
      return validPath;
    }
  }

  throw new RangeError(`Could not find a valid file name for ${filePath}`);

}

export function getDestinationFilePath(ctx: RenderContext, sourceFileEntities: SourceFileEntity[], sourceFileEntity: SourceFileEntity): FilePath {

  const filePaths = sourceFileEntities.reduce<{ paths: FilePath[]; usedPaths: FilePath[]; }>(({ paths, usedPaths }, sourceFileEntity) => {

    const { getFileName, join } = ctx.dependencies.path;

    const fileName = getFileName(sourceFileEntity.path, false);
    const fileExtension = ctx.renderer.fileExtension;
    const config = ctx.config;

    const outputDir = config.outputDir;
    const outputPath = join(outputDir, `${fileName}${fileExtension}`) as FilePath;

    const destinationFilePath = getAvailableFileName(ctx, usedPaths, outputPath);

    return {
      paths: [...paths, destinationFilePath],
      usedPaths: [...usedPaths, destinationFilePath]
    };

  }, { paths: [], usedPaths: [] });

  const index = sourceFileEntities.findIndex(({ symbolId }) => symbolId === sourceFileEntity.symbolId);
  return filePaths.paths[index];

}
