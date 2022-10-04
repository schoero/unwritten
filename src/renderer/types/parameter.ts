import { RenderedParameter, RenderTarget } from "../../types/renderer.js";
import { Parameter, TypeKind } from "../../types/types.js";
import { createRenderedTag } from "../components/tag.js";
import { createRenderedText } from "../components/text.js";
import { createRenderedType } from "../components/type.js";
import { renderType } from "./type.js";


export function createRenderedParameter(param: Parameter): RenderedParameter {

  const rest = param.rest === true ? "..." : "";
  const name = param.name;
  const description = param.description ? param.description : "";
  const type = renderType(param.type);
  const restTag = param.rest === true ? "rest" : "";
  const optionalTag = param.optional === true ? "optional" : "";

  return {
    [RenderTarget.documentation]: createRenderedText([
      createRenderedText(rest),
      createRenderedText(name),
      createRenderedType(type),
      createRenderedText(description),
      ...[
        createRenderedTag(optionalTag),
        createRenderedTag(restTag)
      ]
    ]),
    kind: TypeKind.Parameter,
    [RenderTarget.tableOfContents]: createRenderedText(`${rest}${param.name}`)
  };

}