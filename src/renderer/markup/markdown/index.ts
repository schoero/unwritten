import { Renderer } from "../../../types/renderer.js";
import { render } from "../shared/index.js";

export const markdownRenderer: Renderer = {
  fileExtension: "md",
  name: "markdown",
  render
};