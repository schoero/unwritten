import type { JSDocTags as JSDocTagNames } from "unwritten:compiler:enums/jsdoc.js";


export type Name = string;
export type ID = number;
export type Description = string | undefined;
export type Example = JSDocTags[JSDocTagNames.Example];
export type Alpha = JSDocTags[JSDocTagNames.Alpha];
export type Beta = JSDocTags[JSDocTagNames.Beta];
export type Deprecated = JSDocTags[JSDocTagNames.Deprecated];
export type Internal = JSDocTags[JSDocTagNames.Internal];
export type Remarks = JSDocTags[JSDocTagNames.Remarks];


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
