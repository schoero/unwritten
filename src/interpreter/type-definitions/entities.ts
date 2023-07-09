import type { EntityKind } from "unwritten:interpreter/enums/entity.js";
import type {
  Description,
  ID,
  JSDocTags,
  Modifiers,
  Name,
  Position
} from "unwritten:interpreter:type-definitions/shared.js";
import type { ExpressionType, LiteralType, Type } from "unwritten:interpreter:type-definitions/types.js";
import type { PartialByKey } from "unwritten:type-definitions/utils.js";


type EntityBase<Kind> = {
  kind: Kind;
};

export type ExportableEntityKinds =
  | EntityKind.Class
  | EntityKind.Enum
  | EntityKind.ExportAssignment
  | EntityKind.Function
  | EntityKind.Interface
  | EntityKind.Module
  | EntityKind.Namespace
  | EntityKind.TypeAlias
  | EntityKind.Variable;

export type ExportableEntity =
  | ClassEntity
  | EnumEntity
  | ExportAssignmentEntity
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

export type FunctionLikeEntity =
  | ConstructorEntity
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

export type Entity =
  | ClassEntity
  | ConstructorEntity
  | EnumEntity
  | EnumMemberEntity
  | ExportAssignmentEntity
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

export interface PropertyEntity extends EntityBase<EntityKind.Property>, JSDocTags {
  name: Name;
  symbolId: ID;
  type: Type;
  declarationId?: ID;
  description?: Description;
  initializer?: Type;
  modifiers?: Modifiers[];
  optional?: boolean;
  position?: Position;
}


export interface TupleMemberEntity extends EntityBase<EntityKind.TupleMember>, JSDocTags {
  optional: boolean;
  rest: boolean;
  type: Type;
  name?: Name;
  position?: Position;
}


//-- Function

export interface FunctionLikeEntityBase<Kind extends FunctionLikeEntityKinds> extends EntityBase<Kind> {
  signatures: SignatureEntity[];
  name?: Name;
  symbolId?: ID;
}

export interface FunctionEntity extends FunctionLikeEntityBase<EntityKind.Function> {
}

export interface SignatureEntity extends EntityBase<EntityKind.Signature>, JSDocTags {
  declarationId: ID;
  returnType: Type & { description?: Description; } ;
  description?: Description;
  modifiers?: Modifiers[];
  name?: Name;
  parameters?: ParameterEntity[];
  position?: Position;
  symbolId?: ID;
  typeParameters?: TypeParameterEntity[];
}


//-- Parameter

export interface ParameterEntity extends EntityBase<EntityKind.Parameter>, JSDocTags {
  declarationId: ID;
  name: Name;
  optional: boolean;
  rest: boolean;
  symbolId: ID;
  type: Type;
  description?: Description;
  initializer?: Type;
  position?: Position;
}


//-- Interface

export interface InterfaceEntity extends EntityBase<EntityKind.Interface>, JSDocTags {
  callSignatures: SignatureEntity[];
  constructSignatures: SignatureEntity[];
  getterSignatures: SignatureEntity[];
  methodSignatures: SignatureEntity[];
  name: Name;
  properties: PropertyEntity[];
  setterSignatures: SignatureEntity[];
  symbolId: ID;
  typeId: ID;
  declarationId?: ID;
  description?: Description;
  heritage?: ExpressionType[];
  position?: Position;
  typeArguments?: Type[];
  typeParameters?: TypeParameterEntity[];
}

export interface MergedInterfaceEntity extends Omit<InterfaceEntity, "declarationId"> {
  declarations: PartialByKey<InterfaceEntity, "symbolId">[];
}


//-- Class

export interface ClassEntity extends EntityBase<EntityKind.Class>, JSDocTags {
  declarationId: ID;
  getters: GetterEntity[];
  methods: MethodEntity[];
  modifiers: Modifiers[];
  name: Name;
  properties: PropertyEntity[];
  setters: SetterEntity[];
  symbolId: ID;
  typeId: ID;
  ctor?: ConstructorEntity;
  description?: Description;
  heritage?: ExpressionType;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
}

export interface ConstructorEntity extends FunctionLikeEntityBase<EntityKind.Constructor> {}

export interface MethodEntity extends FunctionLikeEntityBase<EntityKind.Method> {}

export interface SetterEntity extends FunctionLikeEntityBase<EntityKind.Setter> {}

export interface GetterEntity extends FunctionLikeEntityBase<EntityKind.Getter> {}


//-- Variable

export interface VariableEntity extends EntityBase<EntityKind.Variable>, JSDocTags {
  declarationId: ID;
  modifiers: Modifiers[];
  name: Name;
  symbolId: ID;
  type: Type;
  description?: Description;
  position?: Position;
}


//-- Type alias

export interface TypeAliasEntity extends EntityBase<EntityKind.TypeAlias>, JSDocTags {
  declarationId: ID;
  name: Name;
  symbolId: ID;
  type: Type;
  description?: Description;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
}


//-- Mapped Type member

export interface MappedTypeMemberEntity extends EntityBase<EntityKind.MappedTypeMember> {
  keyType: LiteralType;
  valueType: Type;
}


//-- Export Assignment

export interface ExportAssignmentEntity extends EntityBase<EntityKind.ExportAssignment>, JSDocTags {
  name: Name;
  symbolId: ID;
  type: Type;
  description?: Description;
  position?: Position;
}


//-- Enum

export interface EnumEntity extends EntityBase<EntityKind.Enum>, JSDocTags {
  members: EnumMemberEntity[];
  name: Name;
  symbolId: ID;
  declarationId?: ID;
  description?: Description;
  position?: Position;
}

export interface MergedEnumEntity extends Omit<EnumEntity, "declarationId"> {
  declarations: Omit<EnumEntity, "name">[];

}

export interface EnumMemberEntity extends EntityBase<EntityKind.EnumMember>, JSDocTags {
  declarationId: ID;
  name: Name;
  type: Type;
  description?: Description;
  position?: Position;
  symbolId?: ID;
}


//-- Member

export interface MemberEntity extends EntityBase<EntityKind.Member>, JSDocTags {
  modifiers: Modifiers[];
  optional: boolean;
  type: Type;
  description?: Description;
  parent?: Type;
  position?: Position;
}


//-- Module

export interface ModuleEntity extends EntityBase<EntityKind.Module>, JSDocTags {
  exports: ExportableEntity[];
  name: Name;
  symbolId: ID;
  description?: Description;
  position?: Position;
}


//-- Source file (module)

export interface SourceFileEntity extends EntityBase<EntityKind.SourceFile> {
  exports: ExportableEntity[];
  name: Name;
  symbolId: ID;
}


//-- Namespace

export interface NamespaceEntity extends EntityBase<EntityKind.Namespace>, JSDocTags {
  exports: ExportableEntity[];
  name: Name;
  symbolId: ID;
  declarationId?: ID;
  description?: Description;
  position?: Position;
}


//-- TypeParameter

export interface TypeParameterEntity extends EntityBase<EntityKind.TypeParameter> {
  declarationId: ID;
  name: Name;
  symbolId: ID;
  constraint?: Type;
  description?: Description;
  initializer?: Type;
  position?: Position;
}
