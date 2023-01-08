export type Name = string;
export type ID = number;
export type Description = string;
export type Example = string;

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
