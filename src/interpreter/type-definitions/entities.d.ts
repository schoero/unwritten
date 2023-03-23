import type { EntityKind } from "unwritten:interpreter:enums/entities.ts";
import type {
  Description,
  ID,
  JSDocTags,
  Modifiers,
  Name,
  Position
} from "unwritten:interpreter:type-definitions/shared.ts";
import type { ExpressionType, LiteralTypes, Types } from "unwritten:interpreter:type-definitions/types.js";


type Entity<Kind> = {
  id: ID;
  kind: Kind;
};


export type ExportableEntityKinds =
  | EntityKind.Class
  | EntityKind.Enum
  | EntityKind.Function
  | EntityKind.Interface
  | EntityKind.Module
  | EntityKind.Namespace
  | EntityKind.TypeAlias
  | EntityKind.Variable;


export type ExportableEntities =
  | ClassEntity
  | EnumEntity
  | FunctionEntity
  | InterfaceEntity
  | ModuleEntity
  | NamespaceEntity
  | TypeAliasEntity
  | VariableEntity;

export type FunctionLikeEntityKinds =
  | EntityKind.Constructor
  | EntityKind.Function
  | EntityKind.Getter
  | EntityKind.Method
  | EntityKind.Setter;

export type FunctionLikeEntities =
  | FunctionEntity
  | GetterEntity
  | MethodEntity
  | SetterEntity;

export type InferFunctionLikeEntityKind<Kind extends FunctionLikeEntityKinds> =
  Kind extends EntityKind.Constructor
    ? ConstructorEntity
    : Kind extends EntityKind.Function
      ? FunctionEntity
      : Kind extends EntityKind.Getter
        ? GetterEntity
        : Kind extends EntityKind.Method
          ? MethodEntity
          : Kind extends EntityKind.Setter
            ? SetterEntity
            : never;

export type Entities =
  | ClassEntity
  | ConstructorEntity
  | EnumEntity
  | EnumMemberEntity
  | FunctionEntity
  | GetterEntity
  | InterfaceEntity
  | MappedTypeMemberEntity
  | MemberEntity
  | MethodEntity
  | ModuleEntity
  | NamespaceEntity
  | ParameterEntity
  | PropertyEntity
  | SetterEntity
  | SignatureEntity
  | SourceFileEntity
  | TypeAliasEntity
  | TypeParameterEntity
  | VariableEntity;

export interface PropertyEntity extends Entity<EntityKind.Property>, JSDocTags {
  name: Name;
  type: Types;
  description?: Description;
  initializer?: Types;
  modifiers?: Modifiers[];
  optional?: boolean;
  position?: Position;
}


export interface TupleMemberEntity extends Entity<EntityKind.TupleMember>, JSDocTags {
  optional: boolean;
  rest: boolean;
  type: Types;
  name?: Name;
  position?: Position;
}


//-- Function

export interface FunctionLikeEntity<Kind extends FunctionLikeEntityKinds> extends Entity<Kind> {
  signatures: SignatureEntity[];
  name?: Name;
}

export interface FunctionEntity extends FunctionLikeEntity<EntityKind.Function> {
}

export interface SignatureEntity extends Entity<EntityKind.Signature>, JSDocTags {
  returnType: Types & { description?: Description; } ;
  description?: Description;
  modifiers?: Modifiers[];
  name?: Name;
  parameters?: ParameterEntity[];
  position?: Position;
  typeParameters?: TypeParameterEntity[];
}


//-- Parameter

export interface ParameterEntity extends Entity<EntityKind.Parameter>, JSDocTags {
  name: Name;
  optional: boolean;
  rest: boolean;
  description?: Description;
  initializer?: Types;
  position?: Position;
  type?: Types;
}


//-- Interface

export interface InterfaceEntity extends Entity<EntityKind.Interface>, JSDocTags {
  callSignatures: SignatureEntity[];
  constructSignatures: SignatureEntity[];
  getterSignatures: SignatureEntity[];
  methodSignatures: SignatureEntity[];
  name: Name;
  properties: PropertyEntity[];
  setterSignatures: SignatureEntity[];
  description?: Description;
  heritage?: ExpressionType[];
  position?: Position;
  typeArguments?: Types[];
  typeParameters?: TypeParameterEntity[];
}

export interface MergedInterfaceEntity extends InterfaceEntity {
  declarations: Omit<InterfaceEntity, "id" | "name">[];
}


//-- Class

export interface ClassEntity extends Entity<EntityKind.Class>, JSDocTags {
  getters: GetterEntity[];
  methods: MethodEntity[];
  modifiers: Modifiers[];
  name: Name;
  properties: PropertyEntity[];
  setters: SetterEntity[];
  ctor?: ConstructorEntity;
  description?: Description;
  heritage?: ExpressionType;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
}

export interface ConstructorEntity extends FunctionLikeEntity<EntityKind.Constructor> {}

export interface MethodEntity extends FunctionLikeEntity<EntityKind.Method> {}

export interface SetterEntity extends FunctionLikeEntity<EntityKind.Setter> {}

export interface GetterEntity extends FunctionLikeEntity<EntityKind.Getter> {}


//-- Variable

export interface VariableEntity extends Entity<EntityKind.Variable>, JSDocTags {
  modifiers: Modifiers[];
  name: Name;
  type: Types;
  description?: Description;
  position?: Position;
}


//-- Type alias

export interface TypeAliasEntity extends Entity<EntityKind.TypeAlias>, JSDocTags {
  name: Name;
  type: Types;
  description?: Description;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
}


//-- Mapped Type member

export interface MappedTypeMemberEntity extends Entity<EntityKind.MappedTypeMember> {
  keyType: LiteralTypes;
  valueType: Types;
}


//-- Enum

export interface EnumEntity extends Entity<EntityKind.Enum>, JSDocTags {
  members: EnumMemberEntity[];
  name: Name;
  description?: Description;
  position?: Position;
}

export interface MergedEnumEntity extends EnumEntity {
  declarations: Omit<EnumEntity, "id" | "name">[];
}

export interface EnumMemberEntity extends Entity<EntityKind.EnumMember>, JSDocTags {
  name: Name;
  type: Types;
  description?: Description;
  position?: Position;
}


//-- Member

export interface MemberEntity extends Entity<EntityKind.Member>, JSDocTags {
  modifiers: Modifiers[];
  optional: boolean;
  type: Types;
  description?: Description;
  parent?: Types;
  position?: Position;
}


//-- Module

export interface ModuleEntity extends Entity<EntityKind.Module>, JSDocTags {
  exports: ExportableEntities[];
  name: Name;
  description?: Description;
  position?: Position;
}


//-- Source file (module)

export interface SourceFileEntity extends Entity<EntityKind.SourceFile> {
  exports: ExportableEntities[];
  name: Name;
}


//-- Namespace

export interface NamespaceEntity extends Entity<EntityKind.Namespace>, JSDocTags {
  exports: ExportableEntities[];
  name: Name;
  description?: Description;
  position?: Position;
}


//-- TypeParameter

export interface TypeParameterEntity extends Entity<EntityKind.TypeParameter> {
  name: Name;
  constraint?: Types;
  description?: Description;
  initializer?: Types;
  position?: Position;
}
