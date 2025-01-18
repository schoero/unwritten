import type { Entity } from "unwritten:interpreter:type-definitions/entities";
import type { Type } from "unwritten:interpreter:type-definitions/types";


// Mutable
export type Mutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

// Complete
export type Complete<ObjectType extends object> = DeepRequiredByKey<ObjectType>;

// DeepPartialByKey
export type DeepPartial<Type> = DeepPartialByKey<Type>;
export type PartialByKey<Type extends object, SelectedKeys extends keyof Type> = DeepPartialByKey<Type, SelectedKeys, false>;

export type DeepPartialByKey<Type, SelectedKeys extends PropertyKey = PropertyKey, Deep extends boolean = true> =
  Type extends Function
    ? Type
    : Type extends [...infer InferredTupleMembers]
      ? { [TupleMember in keyof InferredTupleMembers]: Deep extends true
        ? DeepPartialByKey<InferredTupleMembers[TupleMember], SelectedKeys>
        : InferredTupleMembers[TupleMember]
      }
      : Type extends object
        ? Deep extends true
          ? DeepPartialByKeyObject<Type, SelectedKeys, true>
          : DeepPartialByKeyObject<Type, SelectedKeys, false>
        : Type;

type DeepPartialByKeyObject<Type, SelectedKeys extends PropertyKey, Deep extends boolean> =
  { [Key in keyof Type as Key extends SelectedKeys ? Key : never]?: Deep extends true
    ? DeepPartialByKey<Type[Key], SelectedKeys>
    : Type[Key]
  } &
  {
    [Key in keyof Type as Key extends SelectedKeys ? never : Key]: Deep extends true
      ? DeepPartialByKey<Type[Key], SelectedKeys>
      : Type[Key]
  } extends infer IntersectionType ? (
      { [key in keyof IntersectionType]: IntersectionType[key] }
    ) : never;


// DeepRequiredByKey
export type DeepRequired<Type> = DeepRequiredByKey<Type>;
export type Required<Type> = DeepRequiredByKey<Type, PropertyKey, false>;
export type RequiredByKey<Type extends object, SelectedKeys extends keyof Type> = DeepRequiredByKey<Type, SelectedKeys, false>;

export type DeepRequiredByKey<Type, SelectedKeys extends PropertyKey = PropertyKey, Deep extends boolean = true> =
  Type extends Function
    ? Type
    : Type extends [...infer InferredTupleMembers]
      ? { [TupleMember in keyof InferredTupleMembers]: Deep extends true
        ? DeepRequiredByKey<InferredTupleMembers[TupleMember], SelectedKeys>
        : InferredTupleMembers[TupleMember]
      }
      : Type extends object
        ? Deep extends true
          ? DeepRequiredByKeyObject<Type, SelectedKeys, true>
          : DeepRequiredByKeyObject<Type, SelectedKeys, false>
        : Type;

type DeepRequiredByKeyObject<Type, SelectedKeys extends PropertyKey, Deep extends boolean> =
  { [Key in keyof Type as Key extends SelectedKeys ? Key : never]-?: Deep extends true
    ? DeepRequiredByKey<Type[Key], SelectedKeys>
    : Type[Key]
  } &
  { [Key in keyof Type as Key extends SelectedKeys ? never : Key]: Deep extends true
    ? DeepRequiredByKey<Type[Key], SelectedKeys>
    : Type[Key]
  } extends infer IntersectionType ? (
      { [key in keyof IntersectionType]: IntersectionType[key] }
    ) : never;

// Helpers
export type Enable<Boolean extends boolean> = Boolean extends false ? true : true;
export type Disable<Boolean extends boolean> = Boolean extends true ? false : false;
export type Toggle<Boolean extends boolean> = Boolean extends true ? false : true;

// Testing
export type Testable<EntityOrType extends Entity | Type> = DeepPartialByKey<EntityOrType, "declarationId" | "modifiers" | "symbolId" | "typeId">;
