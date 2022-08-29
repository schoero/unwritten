import { assert } from "vitest";

import { RenderExtension } from "types/renderer.js";


let _renderExtension: RenderExtension | undefined;

export function setRenderExtension(renderExtension: RenderExtension) {
  _renderExtension = renderExtension;
  return getRenderExtension();
}

export function getRenderExtension(): RenderExtension {
  assert(_renderExtension, "Render extension has not been set");
  return _renderExtension;
}