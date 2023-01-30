import type { Entities } from "unwritten:compiler:type-definitions/entities.js";


export type ObjectValues<O extends Object> = O[keyof O];

export type Complete<Object> = {
  [key in keyof Object]-?: Object[key];
};

export type DeepPartial<T> =
  T extends Function
    ? T
    : T extends (infer InferredArrayMember)[]
      ? DeepPartialArray<InferredArrayMember>
      : T extends object
        ? DeepPartialObject<T>
        : T | undefined;

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = {
  [key in keyof T]?: DeepPartial<T[key]>;
};


//-- DeepOmit

export type DeepOmit<T, K extends PropertyKey> =
  T extends Function
    ? T
    : T extends (infer InferredArrayMember)[]
      ? DeepOmitArray<InferredArrayMember, K>
      : T extends object
        ? DeepOmitObject<T, K>
        : T | undefined;


interface DeepOmitArray <T, K extends PropertyKey> extends Array<DeepOmit<T, K>> {}

type DeepOmitObject<T, K extends PropertyKey> = {
  [key in keyof T]?: key extends K ? never : DeepOmit<T[key], K>;
};


//-- DeepPartialByKey

export type DeepPartialByKey<T, K extends PropertyKey> =
  T extends Function
    ? T
    : T extends (infer InferredArrayMember)[]
      ? DeepPartialByKeyArray<InferredArrayMember, K>
      : T extends object
        ? DeepPartialByKeyObject<T, K>
        : T;


interface DeepPartialByKeyArray <T, K extends PropertyKey> extends Array<DeepPartialByKey<T, K>> {}

type DeepPartialByKeyObject<T, K extends PropertyKey> =
  { [key in keyof T as key extends K ? key : never]?: DeepPartialByKey<T[key], K> } &
  { [key in keyof T as key extends K ? never : key]: DeepPartialByKey<T[key], K> } extends infer O ? (
      { [key in keyof O]: O[key] }
    ) : never;


//-- DeepRequiredByKey

export type DeepRequiredByKey<T, K extends PropertyKey> =
  T extends Function
    ? T
    : T extends (infer InferredArrayMember)[]
      ? DeepRequiredByKeyArray<InferredArrayMember, K>
      : T extends object
        ? DeepRequiredByKeyObject<T, K>
        : T;


interface DeepRequiredByKeyArray <T, K extends PropertyKey> extends Array<DeepRequiredByKey<T, K>> {}

type DeepRequiredByKeyObject<T, K extends PropertyKey> =
  { [key in keyof T as key extends K ? key : never]-?: DeepRequiredByKey<T[key], K> } &
  { [key in keyof T as key extends K ? never : key]: DeepRequiredByKey<T[key], K> } extends infer O ? (
      { [key in keyof O]: O[key] }
    ) : never;


//-- Test

export type Testable<Entity extends Entities> = DeepPartialByKey<Entity, "id" | "modifiers">;
