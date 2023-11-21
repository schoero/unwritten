import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { MarkupRenderContext } from "../types-definitions/markup";


interface TranslationOptions {
  capitalize?: boolean;
  capitalizeEach?: boolean;
  count?: number;
}

type RenderConfig<CustomRenderContext extends MarkupRenderContext> =
  CustomRenderContext["config"]["renderConfig"][RendererName<CustomRenderContext>];

type RendererName<CustomRenderContext extends MarkupRenderContext> = CustomRenderContext["renderer"]["name"];

type RemoveTranslationsSuffix<Keys extends string, S extends "_many" | "_one"> =
  Keys extends `${infer KeyWithoutSuffix}${S}` ? KeyWithoutSuffix : Keys;

export type TranslationKeys =
  TranslationWithoutSuffixes<keyof RenderConfig<MarkupRenderContext>["translations"]>;

export type TranslationWithoutSuffixes<Keys extends string> =
  RemoveTranslationsSuffix<RemoveTranslationsSuffix<Keys, "_one">, "_many">;


export function capitalize(text: string): string {
  return text.length <= 0
    ? ""
    : text[0].toUpperCase() + text.slice(1);
}

function translate(ctx: MarkupRenderContext, key: TranslationKeys, options?: TranslationOptions) {

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


function getTranslations<CustomRenderContext extends MarkupRenderContext>(ctx: CustomRenderContext) {
  return getRenderConfig(ctx).translations;
}


function getTranslationKey(key: TranslationKeys, options?: TranslationOptions) {

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

export function getTranslator<CustomRenderContext extends MarkupRenderContext>(ctx: CustomRenderContext) {
  return (key: TranslationKeys, options?: TranslationOptions) => translate(ctx, key, options);
}
