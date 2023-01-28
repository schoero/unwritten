import { contentFilter } from "quickdoks:compiler:utils/filter.js";
import { RenderCategories } from "quickdoks:renderer:markup/types/renderer.js";

import { createAnchor } from "../linker/index.js";

import { getRenderConfig } from "./config.js";

import type { Encapsulation } from "quickdoks:renderer:markup/types/config.js";
import type { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";
import type { DeepOmit } from "quickdoks:type-definitions/utils.js";


export function spaceBetween(...strings: string[]) {
  return strings.filter(contentFilter).join(" ");
}

export function encapsulate(text: string, encapsulation: Encapsulation | false | undefined) {
  if(encapsulation === undefined || encapsulation === false){
    return text;
  }
  return `${encapsulation[0]}${text}${encapsulation[1]}`;
}


export function renderLink(ctx: RenderContext<MarkupRenderer>, text: string, id?: number): string {
  if(id !== undefined){
    const anchor = createAnchor(ctx, text, id);
    return ctx.renderer.renderAnchorLink(text, anchor);
  } else {
    return text;
  }
}


export function getCategoryName(ctx: RenderContext<MarkupRenderer>, key: RenderCategories | string, plural: boolean = false): string {

  const renderConfig = getRenderConfig(ctx);

  const isValidRenderCategory = (key: RenderCategories | string): key is RenderCategories => key in renderConfig.categoryNames;

  if(!isValidRenderCategory(key)){
    return key;
  }

  return plural ? renderConfig.categoryNames[pluralizeCategoryKey(key)] : renderConfig.categoryNames[key];

}


export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((a, b) => a.concat(b), []);
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


type MultilineOutput = (MultilineOutput | string | undefined)[];

export function filterContentRecursively(strings: MultilineOutput): DeepOmit<MultilineOutput, "undefined"> {
  return strings.reduce<DeepOmit<MultilineOutput, "undefined">>((acc, string) => {
    if(typeof string === "string"){
      acc.push(string);
    }
    if(Array.isArray(string)){
      const filtered = filterContentRecursively(string);
      if(filtered.length > 0){
        acc.push(filtered);
      }
    }
    return acc;
  }, []);
}
