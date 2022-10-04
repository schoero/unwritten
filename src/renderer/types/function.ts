import { RenderedFunction, RenderTarget } from "../../types/renderer.js";
import { Function, TypeKind } from "../../types/types.js";
import { createRenderedLink } from "../components/link.js";
import { createRenderedUnorderedList } from "../components/list.js";
import { createRenderedText } from "../components/text.js";
import { createRenderedTitle } from "../components/title.js";
import { createRenderedParameter } from "./parameter.js";


export function createRenderedFunction(func: Function): RenderedFunction[] {
  return func.signatures.map(signature => ({
    kind: TypeKind.Function,
    [RenderTarget.documentation]: {
      body: [
        createRenderedUnorderedList(signature.parameters.map(param => createRenderedParameter(param)[RenderTarget.documentation])),
        createRenderedText(signature.description ?? "")
      ],
      title: createRenderedTitle([
        createRenderedText(func.name),
        ...signature.parameters.map(param => createRenderedParameter(param)[RenderTarget.tableOfContents])
      ])
    },
    [RenderTarget.tableOfContents]:
      createRenderedLink([
        createRenderedText(func.name),
        ...signature.parameters.map(param => createRenderedParameter(param)[RenderTarget.tableOfContents])
      ], "")
  }));
}


