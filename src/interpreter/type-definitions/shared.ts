export type Optional = {
  optional?: boolean;
};

export type Rest = {
  rest?: boolean;
};

export type Modifiers =
  "abstract" | "accessor" | "async" | "override" | "private" | "protected" | "public" | "readonly" | "static" | NativeModifiers;

export type NativeModifiers =
  | "nativePrivate";

export type Position = {
  column: number;
  file: string;
  line: number;
};
