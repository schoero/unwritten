import { EntityKind } from "unwritten:interpreter/enums/entity.js";

import type {
  CircularEntity,
  ClassEntity,
  ConstructorEntity,
  Entity,
  EnumEntity,
  ExportableEntity,
  ExportAssignmentEntity,
  FunctionEntity,
  FunctionLikeEntity,
  GetterEntity,
  InterfaceEntity,
  MethodEntity,
  ModuleEntity,
  NamespaceEntity,
  PropertyEntity,
  SetterEntity,
  SignatureEntity,
  TypeAliasEntity,
  UnresolvedEntity,
  VariableEntity
} from "unwritten:interpreter/type-definitions/entities.js";


export function isCircularEntity(entity: Entity): entity is CircularEntity {
  return entity.kind === EntityKind.Circular;
}

export function isClassEntity(entity: Entity): entity is ClassEntity {
  return entity.kind === EntityKind.Class;
}

export function isConstructorEntity(entity: Entity): entity is ConstructorEntity {
  return entity.kind === EntityKind.Constructor;
}

export function isEnumEntity(entity: Entity): entity is EnumEntity {
  return entity.kind === EntityKind.Enum;
}

export function isExportAssignmentEntity(entity: Entity): entity is ExportAssignmentEntity {
  return entity.kind === EntityKind.ExportAssignment;
}

export function isExportableEntity(entity: Entity): entity is ExportableEntity {
  return isClassEntity(entity) ||
    isEnumEntity(entity) ||
    isFunctionEntity(entity) ||
    isInterfaceEntity(entity) ||
    isNamespaceEntity(entity) ||
    isTypeAliasEntity(entity) ||
    isVariableEntity(entity) ||
    isExportAssignmentEntity(entity);
}

export function isFunctionEntity(entity: Entity): entity is FunctionEntity {
  return entity.kind === EntityKind.Function;
}

export function isFunctionLikeEntity(entity: Entity): entity is FunctionLikeEntity {
  return isConstructorEntity(entity) ||
    isFunctionEntity(entity) ||
    isMethodEntity(entity) ||
    isGetterEntity(entity) ||
    isSetterEntity(entity);
}

export function isGetterEntity(entity: Entity): entity is GetterEntity {
  return entity.kind === EntityKind.Getter;
}

export function isInterfaceEntity(entity: Entity): entity is InterfaceEntity {
  return entity.kind === EntityKind.Interface;
}

export function isMethodEntity(entity: Entity): entity is MethodEntity {
  return entity.kind === EntityKind.Method;
}

export function isModuleEntity(entity: Entity): entity is ModuleEntity {
  return entity.kind === EntityKind.Module;
}

export function isNamespaceEntity(entity: Entity): entity is NamespaceEntity {
  return entity.kind === EntityKind.Namespace;
}

export function isPropertyEntity(entity: Entity): entity is PropertyEntity {
  return entity.kind === EntityKind.Property;
}

export function isSetterEntity(entity: Entity): entity is SetterEntity {
  return entity.kind === EntityKind.Setter;
}

export function isSignatureEntity(entity: Entity): entity is SignatureEntity {
  return entity.kind === EntityKind.Signature;
}

export function isTypeAliasEntity(entity: Entity): entity is TypeAliasEntity {
  return entity.kind === EntityKind.TypeAlias;
}

export function isUnresolvedEntity(entity: Entity): entity is UnresolvedEntity {
  return entity.kind === EntityKind.Unresolved;
}

export function isVariableEntity(entity: Entity): entity is VariableEntity {
  return entity.kind === EntityKind.Variable;
}
