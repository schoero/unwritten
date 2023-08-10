import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { HTMLRenderConfig, MarkdownRenderConfig, MarkupRenderConfig } from "../types-definitions/config.js";
import type { HTMLRenderContext, MarkdownRenderContext, MarkupRenderContexts } from "../types-definitions/markup.js";

import type { Complete, TranslationWithoutSuffixes } from "unwritten:type-definitions/utils.js";


interface TranslationOptions {
  capitalize?: boolean;
  capitalizeEach?: boolean;
}

interface TranslationOptionWithCount extends TranslationOptions {
  count?: number;
}

export type TranslationKeyOptions
  <
    Key extends TranslationKeys<MarkupRenderContexts>
  > =
  `${Key}_one` extends keyof
  Complete<MarkdownRenderConfig>["translations"]
    ? TranslationOptionWithCount
    : TranslationOptions;

export type TranslationKeys<CustomRenderContext extends MarkupRenderContexts> =
  keyof TranslationWithoutSuffixes<CustomRenderContext["config"]["renderConfig"][CustomRenderContext["renderer"]["name"]]["translations"]>;

export function getTranslator(ctx: MarkupRenderContexts) {
  return <Key extends TranslationKeys<MarkupRenderContexts>>(key: Key, options?: TranslationKeyOptions<Key>) => translate(ctx, key, options);
}

function translate<Key extends TranslationKeys<MarkupRenderContexts>>(ctx: MarkupRenderContexts, key: Key, options?: TranslationKeyOptions<Key>) {

  const translations = getTranslations(ctx);
  const translationKey = getTranslationKey(key, options);

  // Fallback to count: 1
  if(!(translationKey in translations) && (options === undefined || !("count" in options))){
    return translate(ctx, key, { ...options ?? {}, count: 1 });
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


function getTranslationKey<Key extends TranslationKeys<MarkdownRenderContext>>(key: Key, options?: TranslationKeyOptions<Key>): keyof Complete<MarkdownRenderConfig>["translations"];
function getTranslationKey<Key extends TranslationKeys<HTMLRenderContext>>(key: Key, options?: TranslationKeyOptions<Key>): keyof Complete<HTMLRenderConfig>["translations"];
function getTranslationKey<Key extends TranslationKeys<MarkupRenderContexts>>(key: Key, options?: TranslationKeyOptions<Key>): keyof Complete<MarkupRenderConfig>["translations"];
function getTranslationKey<Key extends TranslationKeys<MarkupRenderContexts>>(key: Key, options?: TranslationKeyOptions<Key>) {

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
