import { getRenderConfig } from "../../config/index.js";
import { RenderedTag, RenderKinds } from "../../types/renderer.js";
import { encapsulate } from "../../utils/renderer.js";

export function createRenderedTag(label: string): RenderedTag {

  const encapsulation = getRenderConfig().tagEncapsulation;
  const encapsulatedLabel = encapsulate(label, encapsulation);

  return {
    kind: RenderKinds.tag,
    label: encapsulatedLabel
  };

}