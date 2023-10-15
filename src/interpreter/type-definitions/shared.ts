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
