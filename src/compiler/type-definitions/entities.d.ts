import type {
  Description,
  Example,
  ID,
  Modifiers,
  Name,
  Position
} from "quickdoks:compiler/type-definitions/mixins.d.js";
import type { EntityKind } from "quickdoks:compiler:enums/entities.js";
import type { FunctionType, LiteralTypes, Types } from "quickdoks:compiler:type-definitions/types.d.js";


type Entity<Kind> = {
  id: ID;
  kind: Kind;
};


export type ExportableEntityKinds =
  | EntityKind.Class
  | EntityKind.Enum
  | EntityKind.Function
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
  | ExpressionEntity
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
  | TemplateLiteralEntity
  | ThisEntity
  | TypeAliasEntity
  | TypeArgumentEntity
  | TypeParameterEntity
  | TypeQueryEntity
  | TypeReferenceEntity
  | VariableEntity;

export type PropertyEntity = Entity<EntityKind.Property> & {
  modifiers: Modifiers[];
  name: Name;
  optional: boolean;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
};


export type TupleMemberEntity = Entity<EntityKind.TupleMember> & {
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Types;
  name?: Name;
};


//-- Type reference

export type TypeReferenceEntity = Entity<EntityKind.TypeReference> & {
  name?: Name;
  position?: Position;
  type?: Types;
  typeArguments?: TypeArgumentEntity[];
};


//-- Expression

export type ExpressionEntity = Entity<EntityKind.Expression> & {
  type: Types;
  name?: Name;
  position?: Position;
  typeArguments?: TypeArgumentEntity[];
};


//-- This

export type ThisEntity = Entity<EntityKind.ThisType> & {
  type?: Types;
};


//-- Function

export type FunctionLikeEntity<Kind extends FunctionLikeEntityKinds> = Entity<Kind> & {
  signatures: SignatureEntity[];
  name?: Name;
};

export type FunctionEntity = FunctionLikeEntity<EntityKind.Function> & {
};

export type SignatureEntity = Entity<EntityKind.Signature> & {
  parameters: ParameterEntity[];
  returnType: Types & { description?: Description; } ;
  type: FunctionType;
  description?: Description;
  example?: Example;
  modifiers?: Modifiers[];
  name?: Name;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
};


//-- Parameter

export type ParameterEntity = Entity<EntityKind.Parameter> & {
  name: Name;
  optional: boolean;
  position: Position;
  rest: boolean;
  type: Types;
  description?: Description;
  example?: Example;
  initializer?: Types;
};


//-- Template literal

export type TemplateLiteralEntity = Entity<EntityKind.TemplateLiteral> & {
  spans: string[];
  types: Types[];
  head?: string;
};


//-- Interface

export interface InterfaceEntity extends Entity<EntityKind.Interface> {
  callSignatures: SignatureEntity[];
  constructSignatures: SignatureEntity[];
  getterSignatures: SignatureEntity[];
  methodSignatures: SignatureEntity[];
  name: Name;
  properties: PropertyEntity[];
  setterSignatures: SignatureEntity[];
  description?: Description;
  example?: Example;
  heritage?: ExpressionEntity[];
  position?: Position;
  typeArguments?: TypeArgumentEntity[];
  typeParameters?: TypeParameterEntity[];
}

export interface MergedInterfaceEntity extends InterfaceEntity {
  declarations: Omit<InterfaceEntity, "id" | "name">[];
}


//-- Class

export type ClassEntity = Entity<EntityKind.Class> & {
  getters: GetterEntity[];
  methods: MethodEntity[];
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  properties: PropertyEntity[];
  setters: SetterEntity[];
  ctor?: ConstructorEntity;
  description?: Description;
  example?: Example;
  heritage?: ExpressionEntity;
  typeParameters?: TypeParameterEntity[];
};

export type ConstructorEntity = FunctionLikeEntity<EntityKind.Constructor> & {
};

export type MethodEntity = FunctionLikeEntity<EntityKind.Method> & {
};

export type SetterEntity = FunctionLikeEntity<EntityKind.Setter> & {
};

export type GetterEntity = FunctionLikeEntity<EntityKind.Getter> & {
};


//-- Variable

export type VariableEntity = Entity<EntityKind.Variable> & {
  modifiers: Modifiers[];
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
};


//-- Type alias

export type TypeAliasEntity = Entity<EntityKind.TypeAlias> & {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  typeParameters?: TypeParameterEntity[];
};


//-- Mapped Type member

export type MappedTypeMemberEntity = Entity<EntityKind.MappedTypeMember> & {
  keyType: LiteralTypes;
  valueType: Types;
};


//-- Type query

export type TypeQueryEntity = Entity<EntityKind.TypeQuery> & {
  type: Types;
  name?: Name;
  position?: Position;
};


//-- Interface

export interface InterfaceEntity extends Entity<EntityKind.Interface> {
  name: Name;
  properties: PropertyEntity[];
  description?: Description;
  example?: Example;
  heritage?: ExpressionEntity[];
  position?: Position;
  typeArguments?: TypeArgumentEntity[];
  typeParameters?: TypeParameterEntity[];
}


//-- Enum

export type EnumEntity = Entity<EntityKind.Enum> & {
  members: EnumMemberEntity[];
  name: Name;
  description?: Description;
  example?: Example;
  position?: Position;
};

export type MergedEnumEntity = EnumEntity & {
  declarations: Omit<EnumEntity, "id" | "name">[];
};

export type EnumMemberEntity = Entity<EntityKind.EnumMember> & {
  name: Name;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  parent?: Types;
};


//-- Member

export type MemberEntity = Entity<EntityKind.Member> & {
  modifiers: Modifiers[];
  optional: boolean;
  position: Position;
  type: Types;
  description?: Description;
  example?: Example;
  parent?: Types;
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
  position: Position;
  constraint?: Types;
  description?: Description;
  initializer?: Types;
};


//-- TypeArgument

export type TypeArgumentEntity = Entity<EntityKind.TypeArgument> & {
  position: Position;
  type: Types;
};
