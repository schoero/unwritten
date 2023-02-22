import { RenderCategories } from "unwritten:renderer:markup/types-definitions/renderer.d.js";

import { getRenderConfig } from "./config.js";
import { createAnchor } from "./linker.js";

import type { Encapsulation } from "unwritten:renderer/markup/types-definitions/config.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";


export function encapsulate(node: ASTNodes, encapsulation: Encapsulation | false | undefined) {
  if(encapsulation === undefined || encapsulation === false){
    return node;
  }
  return [encapsulation[0], node, encapsulation[1]];
}


export function getCategoryName(ctx: MarkupRenderContexts, key: RenderCategories | string, plural: boolean = false): string {

  const renderConfig = getRenderConfig(ctx);

  const isValidRenderCategory = (key: RenderCategories | string): key is RenderCategories => key in renderConfig.categoryNames;

  if(!isValidRenderCategory(key)){
    return key;
  }

  return plural ? renderConfig.categoryNames[pluralizeCategoryKey(key)] : renderConfig.categoryNames[key];

}


function pluralizeCategoryKey(key: RenderCategories): RenderCategories {
  switch (key){
    case RenderCategories.Function:
      return RenderCategories.Functions;
    case RenderCategories.Class:
      return RenderCategories.Classes;
    case RenderCategories.Constructor:
      return RenderCategories.Constructors;
    case RenderCategories.Property:
      return RenderCategories.Properties;
    case RenderCategories.Method:
      return RenderCategories.Methods;
    case RenderCategories.Setter:
      return RenderCategories.Setters;
    case RenderCategories.Getter:
      return RenderCategories.Getters;
    case RenderCategories.Interface:
      return RenderCategories.Interfaces;
    case RenderCategories.Enum:
      return RenderCategories.Enums;
    case RenderCategories.TypeAlias:
      return RenderCategories.TypeAliases;
    case RenderCategories.Variable:
      return RenderCategories.Variables;
    case RenderCategories.Namespace:
      return RenderCategories.Namespaces;
    case RenderCategories.Module:
      return RenderCategories.Modules;
    default:
      return key;
  }
}

/** Filters empty strings from converted ASTNodes[] */
// export function nodeFilter<T extends ASTNodes[]>(fn: () => T): T extends (infer R)[] ? Exclude<R, "">[] : T {
//   const returnValue = fn();
//   if(Array.isArray(returnValue)){
//     return returnValue
//       .filter(value => value !== "") as
//       T extends (infer R)[] ? Exclude<R, "">[] : T;
//   } else {
//     return returnValue;
//   }
// }

export function nodeFilter(node: ASTNodes) {
  return node !== "";
}

export function renderLink(ctx: MarkupRenderContexts, text: string, id?: number): string {
  if(id !== undefined){
    const anchor = createAnchor(ctx, text, id);
    return ctx.renderer.renderAnchorLink(text, anchor);
  } else {
    return text;
  }
}

export function spaceBetween(...nodes: ASTNodes[]) {
  return nodes
    .filter(nodeFilter)
    .reduce<ASTNodes[]>((acc, node, index) => {
    if(index > 0){
      acc.push(" ", node);
    } else {
      acc.push(node);
    }
    return acc;
  }, []);
}
