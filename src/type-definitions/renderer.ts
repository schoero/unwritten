import type { SourceFileEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { FileExtension, FilePath } from "unwritten:type-definitions/file-system.js";

import type { RenderContext } from "./context.js";


export interface RenderOutput {
  [filePath: FilePath]: string;
}

export interface Renderer {
  /** The file extension the renderer generates */
  fileExtension: FileExtension;
  /** The name of the render extension */
  name: string;
  /** The render function */
  render(ctx: RenderContext, sourceFileEntities: SourceFileEntity[]): RenderOutput;
}
