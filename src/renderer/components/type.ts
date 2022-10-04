import { RenderedType, RenderKinds } from "../../types/renderer.js";



export function createRenderedType(type: string): RenderedType {
  return {
    kind: RenderKinds.type,
    label: type
  };
}