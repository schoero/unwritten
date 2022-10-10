import { Renderer } from "../../../types/renderer.js";
import { render } from "../shared/index.js";

export const htmlRenderer: Renderer = {
  name: "html",
  fileExtension: "html",
  render
}