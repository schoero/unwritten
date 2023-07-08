import type { JSDocTags as JSDocTagNames } from "unwritten:interpreter/enums/jsdoc.js";


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
  -readonly [Key in keyof typeof JSDocTagNames as typeof JSDocTagNames[Key]]?: string | undefined;
};

export type JSDoc = JSDocTags & {
  description?: Description;
  example?: Example;
  remarks?: Remarks;
};

export type Optional = {
  optional?: boolean;
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
