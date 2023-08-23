import type { JSDocTagNames } from "unwritten:interpreter/enums/jsdoc.js";
import type { Type } from "unwritten:interpreter/type-definitions/types.js";


type JSDocTag = string | undefined;
export type Name = string;
export type ID = number;
export type Description = string | undefined;
export type Throws = {
  description?: Description;
  type?: Type;
}[] | undefined;
export type Examples = JSDocTag[] | undefined;
export type Alpha = JSDocTag;
export type Beta = JSDocTag;
export type Deprecated = JSDocTag;
export type Internal = JSDocTag;
export type Template = JSDocTag;
export type Remarks = JSDocTag;

export interface JSDocTags {
  [JSDocTagNames.Alpha]?: Alpha;
  [JSDocTagNames.Beta]?: Beta;
  [JSDocTagNames.Deprecated]?: Deprecated;
  [JSDocTagNames.Description]?: Description;
  [JSDocTagNames.Example]?: Examples;
  [JSDocTagNames.Remarks]?: Remarks;
  [JSDocTagNames.Throws]?: Throws;
  [JSDocTagNames.Internal]?: Internal;
  [JSDocTagNames.Template]?: Template;
}

export type Optional = {
  optional?: boolean;
};

export type Rest = {
  rest?: boolean;
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
