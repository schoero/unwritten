import type { EntityKind } from "unwritten:interpreter/enums/entity";
import type { Modifiers, Position } from "unwritten:interpreter:type-definitions/shared";
import type { ExpressionType, Type } from "unwritten:interpreter:type-definitions/types";
import type { PartialByKey } from "unwritten:type-definitions/utils";

import type { Description, ID, JSDocProperties, Name } from "./jsdoc";


type EntityBase<Kind extends EntityKind> = {
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

export type LinkableEntity =
  | CircularEntity
  | ExportableEntity
  | ParameterEntity
  | PropertyEntity
  | SignatureEntity
  | TypeParameterEntity;

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

export type SignatureEntityKinds =
  | EntityKind.CallSignature
  | EntityKind.ConstructSignature
  | EntityKind.FunctionSignature
  | EntityKind.GetterSignature
  | EntityKind.MethodSignature
  | EntityKind.SetterSignature;

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
  | CircularEntity
  | ClassEntity
  | ConstructorEntity
  | EnumEntity
  | EnumMemberEntity
  | ExportAssignmentEntity
  | FunctionEntity
  | GetterEntity
  | InterfaceEntity
  | MethodEntity
  | ModuleEntity
  | NamespaceEntity
  | ParameterEntity
  | PropertyEntity
  | SetterEntity
  | SignatureEntity
  | SourceFileEntity
  | TupleMemberEntity
  | TypeAliasEntity
  | TypeParameterEntity
  | UnresolvedEntity
  | VariableEntity;

export interface PropertyEntity extends EntityBase<EntityKind.Property>, JSDocProperties {
  name: Name;
  symbolId: ID;
  type: Type;
  declarationId?: ID;
  initializer?: Type;
  modifiers?: Modifiers[];
  optional?: boolean;
  position?: Position;
}

export interface TupleMemberEntity extends EntityBase<EntityKind.TupleMember>, JSDocProperties {
  optional: boolean;
  rest: boolean;
  type: Type;
  name?: Name;
  position?: Position;
  symbolId?: ID;
}

export interface FunctionLikeEntityBase<Kind extends FunctionLikeEntityKinds> extends EntityBase<Kind> {
  signatures: SignatureEntity[];
  name?: Name;
  symbolId?: ID;
}

export interface FunctionEntity extends FunctionLikeEntityBase<EntityKind.Function> {
}

export interface SignatureEntity extends EntityBase<SignatureEntityKinds>, JSDocProperties {
  returnType: Type & { description?: Description; } ;
  declarationId?: ID;
  modifiers?: Modifiers[];
  name?: Name;
  parameters?: ParameterEntity[];
  position?: Position;
  symbolId?: ID;
  typeParameters?: TypeParameterEntity[];
}

export interface ExplicitSignatureEntity extends SignatureEntity {
  declarationId: ID;
}

export interface ParameterEntity extends EntityBase<EntityKind.Parameter>, JSDocProperties {
  declarationId: ID;
  name: Name;
  optional: boolean;
  rest: boolean;
  symbolId: ID;
  type: Type;
  initializer?: Type;
  position?: Position;
}

export interface InterfaceEntity extends EntityBase<EntityKind.Interface>, JSDocProperties {
  callSignatures: SignatureEntity[];
  constructSignatures: SignatureEntity[];
  events: PropertyEntity[];
  getterSignatures: SignatureEntity[];
  methodSignatures: SignatureEntity[];
  name: Name;
  properties: PropertyEntity[];
  setterSignatures: SignatureEntity[];
  symbolId: ID;
  typeId: ID;
  declarationId?: ID;
  heritage?: ExpressionType[];
  position?: Position;
  typeArguments?: Type[];
  typeParameters?: TypeParameterEntity[];
}

export interface MergedInterfaceEntity extends Omit<InterfaceEntity, "declarationId"> {
  declarations: PartialByKey<InterfaceEntity, "symbolId">[];
}

export interface ClassEntity extends EntityBase<EntityKind.Class>, JSDocProperties {
  declarationId: ID;
  events: PropertyEntity[];
  getters: GetterEntity[];
  methods: MethodEntity[];
  modifiers: Modifiers[];
  name: Name;
  properties: PropertyEntity[];
  setters: SetterEntity[];
  symbolId: ID;
  typeId: ID;
  ctor?: ConstructorEntity;
  heritage?: ExpressionType;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
}

export interface ConstructorEntity extends FunctionLikeEntityBase<EntityKind.Constructor> {}

export interface MethodEntity extends FunctionLikeEntityBase<EntityKind.Method> {}

export interface SetterEntity extends FunctionLikeEntityBase<EntityKind.Setter> {}

export interface GetterEntity extends FunctionLikeEntityBase<EntityKind.Getter> {}

export interface VariableEntity extends EntityBase<EntityKind.Variable>, JSDocProperties {
  declarationId: ID;
  modifiers: Modifiers[];
  name: Name;
  symbolId: ID;
  type: Type;
  position?: Position;
}

export interface TypeAliasEntity extends EntityBase<EntityKind.TypeAlias>, JSDocProperties {
  declarationId: ID;
  name: Name;
  symbolId: ID;
  type: Type;
  position?: Position;
  typeParameters?: TypeParameterEntity[];
}

export interface ExportAssignmentEntity extends EntityBase<EntityKind.ExportAssignment>, JSDocProperties {
  name: Name;
  symbolId: ID;
  type: Type;
  position?: Position;
}

export interface EnumEntity extends EntityBase<EntityKind.Enum>, JSDocProperties {
  members: EnumMemberEntity[];
  name: Name;
  symbolId: ID;
  declarationId?: ID;
  position?: Position;
}

export interface MergedEnumEntity extends Omit<EnumEntity, "declarationId"> {
  declarations: Omit<EnumEntity, "name">[];

}

export interface EnumMemberEntity extends EntityBase<EntityKind.EnumMember>, JSDocProperties {
  declarationId: ID;
  name: Name;
  type: Type;
  position?: Position;
  symbolId?: ID;
}

export interface ModuleEntity extends EntityBase<EntityKind.Module>, JSDocProperties {
  exports: ExportableEntity[];
  name: Name;
  symbolId: ID;
  position?: Position;
}

export interface SourceFileEntity extends EntityBase<EntityKind.SourceFile> {
  exports: ExportableEntity[];
  name: Name;
  path: string;
  symbolId: ID;
}

export interface NamespaceEntity extends EntityBase<EntityKind.Namespace>, JSDocProperties {
  exports: ExportableEntity[];
  name: Name;
  symbolId: ID;
  declarationId?: ID;
  position?: Position;
}

export interface TypeParameterEntity extends EntityBase<EntityKind.TypeParameter>, JSDocProperties {
  declarationId: ID;
  name: Name;
  symbolId: ID;
  constraint?: Type;
  initializer?: Type;
  position?: Position;
}

export interface UnresolvedEntity extends EntityBase<EntityKind.Unresolved> {
  name: Name;
  symbolId: ID;
  position?: Position;
}

export interface CircularEntity extends EntityBase<EntityKind.Circular> {
  name: Name;
  symbolId: ID;
  position?: Position;
}
