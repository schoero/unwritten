import type { SourceFileEntity } from "unwritten:interpreter:type-definitions/entities";

import type { RenderContext } from "./context";
import type { FileExtension, FilePath } from "./platform";


export interface RenderOutput {
  [filePath: FilePath]: string;
}

export interface Renderer {
  /** The file extension the renderer generates. */
  fileExtension: FileExtension;
  /** The name of the render extension. */
  name: string;
  /** The render function. */
  render: (ctx: RenderContext, sourceFileEntities: SourceFileEntity[]) => RenderOutput;
}
