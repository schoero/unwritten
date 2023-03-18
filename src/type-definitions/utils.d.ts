import type { Types } from "unwritten:compiler/type-definitions/types.js";
import type { Entities } from "unwritten:compiler:type-definitions/entities.js";


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
  [Key in keyof T]?: DeepPartial<T[Key]>;
};


//-- Complete

export type Complete<ObjectType extends object> = DeepRequiredByKey<ObjectType, string>;


//-- Remove translations suffix

type RemoveTranslationsSuffix<T extends object, S extends "_one" | "_other"> = {
  [Key in keyof T as Key extends `${infer KeyWithoutSuffix}${S}` ? KeyWithoutSuffix : Key]: T[Key];
};

type TranslationWithoutSuffixes<T extends object> = RemoveTranslationsSuffix<RemoveTranslationsSuffix<T, "_one">, "_other">;


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
  [Key in keyof T]?: Key extends K ? never : DeepOmit<T[Key], K>;
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
  { [Key in keyof T as Key extends K ? Key : never]?: DeepPartialByKey<T[Key], K> } &
  { [Key in keyof T as Key extends K ? never : Key]: DeepPartialByKey<T[Key], K> } extends infer O ? (
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
  { [Key in keyof T as Key extends K ? Key : never]-?: DeepRequiredByKey<T[Key], K> } &
  { [Key in keyof T as Key extends K ? never : Key]: DeepRequiredByKey<T[Key], K> } extends infer O ? (
      { [key in keyof O]: O[key] }
    ) : never;


//-- Test

export type Testable<Entity extends Entities | Types> = DeepPartialByKey<Entity, "id" | "modifiers">;
