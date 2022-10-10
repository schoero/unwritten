import { Encapsulation } from "../../../types/config.js";
import { RenderContext } from "../../../types/context.js";
import { RenderCategories } from "../types/renderer.js";

export function encapsulate(text: string, encapsulation: Encapsulation) {
  return `${encapsulation[0]}${text}${encapsulation[1]}`;
}

export function getCategoryName(ctx: RenderContext, key: RenderCategories | string, plural: boolean = false): string {

  const isValidRenderCategory = (key: RenderCategories | string): key is RenderCategories => key in renderConfig.categoryNames;

  if(!isValidRenderCategory(key)){
    return key;
  }

  return plural ? ctx.config.renderConfig[ctx.renderer].categoryNames[pluralizeCategoryKey(key)] : getRenderConfig().categoryNames[key];

}