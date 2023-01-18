import type { JSDocTags as JSDocTagNames } from "quickdoks:compiler/enums/jsdoc.js";


export type Name = string;
export type ID = number;
export type Description = string;


export type JSDocTags = {
  -readonly [key in keyof typeof JSDocTagNames as typeof JSDocTagNames[key]]?: string | undefined;
};

export type Modifiers =
  | NativeModifiers
  | "abstract"
  | "accessor"
  | "async"
  | "override"
  | "private"
  | "protected"
  | "public"
  | "readonly"
  | "static";

export type NativeModifiers =
  | "nativePrivate";

export type Position = {
  column: number;
  file: string;
  line: number;
};
