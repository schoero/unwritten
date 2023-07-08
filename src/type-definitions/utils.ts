import type { Entity } from "unwritten:interpreter/type-definitions/entities.js";
import type { Type } from "unwritten:interpreter:type-definitions/types.js";


//-- Mutable

export type Mutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};


//-- DeepPartial

export type DeepPartial<T> =
  T extends Function
    ? T
    : T extends (infer InferredArrayMember)[]
      ? DeepPartial<InferredArrayMember>[]
      : T extends object
        ? DeepPartialObject<T>
        : T | undefined;

type DeepPartialObject<T> = {
  [Key in keyof T]?: DeepPartial<T[Key]>;
};


//-- Complete

export type Complete<ObjectType extends object> = DeepRequiredByKey<ObjectType, string>;


//-- Remove translations suffix

type RemoveTranslationsSuffix<T extends object, S extends "_one" | "_other"> = {
  [Key in keyof T as Key extends `${infer KeyWithoutSuffix}${S}` ? KeyWithoutSuffix : Key]: T[Key];
};

export type TranslationWithoutSuffixes<T extends object> = RemoveTranslationsSuffix<RemoveTranslationsSuffix<T, "_one">, "_other">;


//-- DeepOmit

export type DeepOmit<T, K extends PropertyKey> =
  T extends Function
    ? T
    : T extends (infer InferredArrayMember)[]
      ? DeepOmit<InferredArrayMember, K>[]
      : T extends object
        ? DeepOmitObject<T, K>
        : T | undefined;


type DeepOmitObject<T, K extends PropertyKey> = {
  [Key in keyof T]?: Key extends K ? never : DeepOmit<T[Key], K>;
};


//-- PartialByKey

export type PartialByKey<T, K extends keyof T> =
{ [Key in keyof T as Key extends K ? Key : never]?: T[Key] } &
{ [Key in keyof T as Key extends K ? never : Key]: T[Key] };


//-- DeepPartialByKey

export type DeepPartialByKey<T, K extends PropertyKey> =
  T extends Function
    ? T
    : T extends (infer InferredArrayMember)[]
      ? DeepPartialByKey<InferredArrayMember, K>[]
      : T extends object
        ? DeepPartialByKeyObject<T, K>
        : T;

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
      ? DeepRequiredByKey<InferredArrayMember, K>[]
      : T extends object
        ? DeepRequiredByKeyObject<T, K>
        : T;

type DeepRequiredByKeyObject<T, K extends PropertyKey> =
  { [Key in keyof T as Key extends K ? Key : never]-?: DeepRequiredByKey<T[Key], K> } &
  { [Key in keyof T as Key extends K ? never : Key]: DeepRequiredByKey<T[Key], K> } extends infer O ? (
      { [key in keyof O]: O[key] }
    ) : never;


//-- Test

export type Testable<EntityOrType extends Entity | Type> = DeepPartialByKey<EntityOrType, "declarationId" | "modifiers" | "symbolId" | "typeId">;
