import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { HTMLRenderConfig, MarkdownRenderConfig, MarkupRenderConfig } from "../types-definitions/config.js";
import type { HTMLRenderContext, MarkdownRenderContext, MarkupRenderContexts } from "../types-definitions/markup.js";

import type { Complete, TranslationWithoutSuffixes } from "unwritten:type-definitions/utils.js";


interface TranslationOptions {
  capitalize?: boolean;
  capitalizeEach?: boolean;
  count?: number;
}

export type TranslationKeys<CustomRenderContext extends MarkupRenderContexts> =
  keyof TranslationWithoutSuffixes<CustomRenderContext["config"]["renderConfig"][CustomRenderContext["renderer"]["name"]]["translations"]>;

export function getTranslator(ctx: MarkupRenderContexts) {
  return (key: TranslationKeys<MarkupRenderContexts>, options?: TranslationOptions) => translate(ctx, key, options);
}

function translate(ctx: MarkupRenderContexts, key: TranslationKeys<MarkupRenderContexts>, options?: TranslationOptions) {

  const translations = getTranslations(ctx);
  let translationKey = getTranslationKey(key, options);

  // Fallback to count: 1
  if(!(translationKey in translations) && (options === undefined || !("count" in options))){
    translationKey = getTranslationKey(key, { count: 1 });
  }

  // Fallback to no count
  if(!(translationKey in translations)){
    translationKey = getTranslationKey(key);
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Purposefully returning the key
  const translation = translations[translationKey] ?? key;

  if(options?.capitalize){
    return capitalize(translation);
  }if(options?.capitalizeEach){
    return translation
      .split(" ")
      .map(capitalize)
      .join(" ");
  } else {
    return translation;
  }

}


function getTranslations<MarkupRenderContext extends MarkupRenderContexts>(ctx: MarkupRenderContext) {
  return getRenderConfig(ctx).translations;
}


function getTranslationKey(key: TranslationKeys<MarkdownRenderContext>, options?: TranslationOptions): keyof Complete<MarkdownRenderConfig>["translations"];
function getTranslationKey(key: TranslationKeys<HTMLRenderContext>, options?: TranslationOptions): keyof Complete<HTMLRenderConfig>["translations"];
function getTranslationKey(key: TranslationKeys<MarkupRenderContexts>, options?: TranslationOptions): keyof Complete<MarkupRenderConfig>["translations"];
function getTranslationKey(key: TranslationKeys<MarkupRenderContexts>, options?: TranslationOptions) {

  const count = options && "count" in options ? options.count : undefined;

  if(count === undefined){
    return key;
  } else if(count === 0){
    return `${key}_zero`;
  } else if(count === 1){
    return `${key}_one`;
  } else {
    return `${key}_many`;
  }

}

function capitalize(text: string): string {
  return text.length <= 0
    ? ""
    : text[0].toUpperCase() + text.slice(1);
}
