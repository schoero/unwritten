import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";

import type { HTMLRenderConfig, MarkdownRenderConfig, MarkupRenderConfig } from "../types-definitions/config.js";
import type { HTMLRenderContext, MarkdownRenderContext, MarkupRenderContexts } from "../types-definitions/markup.js";

import type { Complete, TranslationWithoutSuffixes } from "unwritten:type-definitions/utils.js";


interface TranslationOptions {
  capitalize?: boolean;
  count?: number;
}

export function getTranslator<MarkupRenderContext extends MarkdownRenderContext>(ctx: MarkdownRenderContext): (key: keyof TranslationWithoutSuffixes<Complete<MarkdownRenderConfig>["translations"]>, options?: TranslationOptions) => string;
export function getTranslator<MarkupRenderContext extends HTMLRenderContext>(ctx: HTMLRenderContext): (key: keyof TranslationWithoutSuffixes<Complete<HTMLRenderConfig>["translations"]>, options?: TranslationOptions) => string;
export function getTranslator<MarkupRenderContext extends MarkupRenderContexts>(ctx: MarkupRenderContext): (key: keyof TranslationWithoutSuffixes<Complete<MarkupRenderConfig>["translations"]>, options?: TranslationOptions) => string;
export function getTranslator<MarkupRenderContext extends MarkupRenderContexts>(ctx: MarkupRenderContext) {
  return (key: keyof TranslationWithoutSuffixes<Complete<MarkupRenderConfig>["translations"]>, options?: TranslationOptions) => translate(ctx, key, options);
}

function translate(ctx: MarkdownRenderContext, key: keyof TranslationWithoutSuffixes<Complete<MarkdownRenderConfig>["translations"]>, options?: TranslationOptions): string;
function translate(ctx: HTMLRenderContext, key: keyof TranslationWithoutSuffixes<Complete<HTMLRenderConfig>["translations"]>, options?: TranslationOptions): string;
function translate(ctx: MarkupRenderContexts, key: keyof TranslationWithoutSuffixes<Complete<MarkupRenderConfig>["translations"]>, options?: TranslationOptions): string;
function translate(ctx: MarkupRenderContexts, key: keyof TranslationWithoutSuffixes<Complete<MarkupRenderConfig>["translations"]>, options?: TranslationOptions) {

  const translations = getTranslations(ctx);
  const translationKey = getTranslationKey(key, options);

  if(!(translationKey in translations)){
    return translationKey;
  }

  const translation = translations[translationKey];

  if(options?.capitalize){
    return capitalize(translation);
  } else {
    return translation;
  }

}


function getTranslations<MarkupRenderContext extends MarkdownRenderContext>(ctx: MarkdownRenderContext): Complete<MarkdownRenderConfig>["translations"];
function getTranslations<MarkupRenderContext extends HTMLRenderContext>(ctx: HTMLRenderContext): Complete<HTMLRenderConfig>["translations"];
function getTranslations<MarkupRenderContext extends MarkupRenderContexts>(ctx: MarkupRenderContext): Complete<MarkupRenderConfig>["translations"];
function getTranslations<MarkupRenderContext extends MarkupRenderContexts>(ctx: MarkupRenderContext) {
  return getRenderConfig(ctx).translations;
}


function getTranslationKey(key: keyof TranslationWithoutSuffixes<Complete<MarkdownRenderConfig>["translations"]>, options?: TranslationOptions): keyof Complete<MarkdownRenderConfig>["translations"];
function getTranslationKey(key: keyof TranslationWithoutSuffixes<Complete<HTMLRenderConfig>["translations"]>, options?: TranslationOptions): keyof Complete<HTMLRenderConfig>["translations"];
function getTranslationKey(key: keyof TranslationWithoutSuffixes<Complete<MarkupRenderConfig>["translations"]>, options?: TranslationOptions): keyof Complete<MarkupRenderConfig>["translations"];
function getTranslationKey(key: keyof TranslationWithoutSuffixes<Complete<MarkupRenderConfig>["translations"]>, options?: TranslationOptions) {

  const { count } = options ?? {};

  if(count === undefined){
    return key;
  } else if(count === 0){
    return `${key}_zero`;
  } else if(count === 1){
    return `${key}_one`;
  } else {
    return `${key}_other`;
  }

}

function capitalize(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}
