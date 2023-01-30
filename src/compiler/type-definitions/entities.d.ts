import type { EntityKind } from "unwritten:compiler:enums/entities.js";
import type {
  Description,
  ID,
  JSDocTags,
  Modifiers,
  Name,
  Position
} from "unwritten:compiler:type-definitions/mixins.d.js";
import type { ExpressionType, LiteralTypes, Types } from "unwritten:compiler:type-definitions/types.d.js";


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
  | Types
  | VariableEntity;

export type PropertyEntity = Entity<EntityKind.Property> & JSDocTags & {
  modifiers: Modifiers[];
  name: Name;
  optional: boolean;
  type: Types;
  description?: Description;
  position?: Position;
};


export type TupleMemberEntity = Entity<EntityKind.TupleMember> & JSDocTags & {
  optional: boolean;
  rest: boolean;
  type: Types;
  name?: Name;
  position?: Position;
};


//-- Function

export type FunctionLikeEntity<Kind extends FunctionLikeEntityKinds> = Entity<Kind> & {
  signatures: SignatureEntity[];
  name?: Name;
};

export type FunctionEntity = FunctionLikeEntity<EntityKind.Function> & {
};

export type SignatureEntity = Entity<EntityKind.Signature> & JSDocTags & {
  parameters: ParameterEntity[];
  returnType: Types & { description?: Description; } ;
  description?: Description;
  modifiers?: Modifiers[];
  name?: Name;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
};


//-- Parameter

export type ParameterEntity = Entity<EntityKind.Parameter> & JSDocTags & {
  name: Name;
  optional: boolean;
  rest: boolean;
  description?: Description;
  initializer?: Types;
  position?: Position;
  type?: Types;
};


//-- Interface

export type InterfaceEntity = Entity<EntityKind.Interface> & JSDocTags & {
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
};

export type MergedInterfaceEntity = InterfaceEntity & {
  declarations: Omit<InterfaceEntity, "id" | "name">[];
};


//-- Class

export type ClassEntity = Entity<EntityKind.Class> & JSDocTags & {
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
};

export type ConstructorEntity = FunctionLikeEntity<EntityKind.Constructor> & {};

export type MethodEntity = FunctionLikeEntity<EntityKind.Method> & {};

export type SetterEntity = FunctionLikeEntity<EntityKind.Setter> & {};

export type GetterEntity = FunctionLikeEntity<EntityKind.Getter> & {};


//-- Variable

export type VariableEntity = Entity<EntityKind.Variable> & JSDocTags & {
  modifiers: Modifiers[];
  name: Name;
  type: Types;
  description?: Description;
  position?: Position;
};


//-- Type alias

export type TypeAliasEntity = Entity<EntityKind.TypeAlias> & JSDocTags & {
  name: Name;
  type: Types;
  description?: Description;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
};


//-- Mapped Type member

export type MappedTypeMemberEntity = Entity<EntityKind.MappedTypeMember> & {
  keyType: LiteralTypes;
  valueType: Types;
};


//-- Enum

export type EnumEntity = Entity<EntityKind.Enum> & JSDocTags & {
  members: EnumMemberEntity[];
  name: Name;
  description?: Description;
  position?: Position;
};

export type MergedEnumEntity = EnumEntity & {
  declarations: Omit<EnumEntity, "id" | "name">[];
};

export type EnumMemberEntity = Entity<EntityKind.EnumMember> & JSDocTags & {
  name: Name;
  type: Types;
  description?: Description;
  position?: Position;
};


//-- Member

export type MemberEntity = Entity<EntityKind.Member> & JSDocTags & {
  modifiers: Modifiers[];
  optional: boolean;
  type: Types;
  description?: Description;
  parent?: Types;
  position?: Position;
};


//-- Module

export type ModuleEntity = Entity<EntityKind.Module> & {
  exports: ExportableEntities[];
  name: Name;
};


//-- Source file (module)

export type SourceFileEntity = Entity<EntityKind.SourceFile> & {
  exports: ExportableEntities[];
  name: Name;
};


//-- Namespace

export type NamespaceEntity = Entity<EntityKind.Namespace> & {
  exports: ExportableEntities[];
  name: Name;
};


//-- TypeParameter

export type TypeParameterEntity = Entity<EntityKind.TypeParameter> & {
  name: Name;
  constraint?: Types;
  description?: Description;
  initializer?: Types;
  position?: Position;
};
