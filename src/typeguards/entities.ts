import { EntityKind } from "unwritten:interpreter:enums/entities.js";

import type {
  ClassEntity,
  ConstructorEntity,
  Entities,
  EnumEntity,
  ExportableEntities,
  ExportAssignmentEntity,
  FunctionEntity,
  FunctionLikeEntities,
  GetterEntity,
  InterfaceEntity,
  MethodEntity,
  ModuleEntity,
  NamespaceEntity,
  PropertyEntity,
  SetterEntity,
  SignatureEntity,
  TypeAliasEntity,
  VariableEntity
} from "unwritten:interpreter:type-definitions/entities.js";


export function isClassEntity(entity: Entities): entity is ClassEntity {
  return entity.kind === EntityKind.Class;
}

export function isConstructorEntity(entity: Entities): entity is ConstructorEntity {
  return entity.kind === EntityKind.Constructor;
}

export function isEnumEntity(entity: Entities): entity is EnumEntity {
  return entity.kind === EntityKind.Enum;
}

export function isExportAssignmentEntity(entity: Entities): entity is ExportAssignmentEntity {
  return entity.kind === EntityKind.ExportAssignment;
}

export function isExportableEntity(entity: Entities): entity is ExportableEntities {
  return isClassEntity(entity) ||
    isEnumEntity(entity) ||
    isFunctionEntity(entity) ||
    isInterfaceEntity(entity) ||
    isNamespaceEntity(entity) ||
    isTypeAliasEntity(entity) ||
    isVariableEntity(entity) ||
    isExportAssignmentEntity(entity);
}

export function isFunctionEntity(entity: Entities): entity is FunctionEntity {
  return entity.kind === EntityKind.Function;
}

export function isFunctionLikeEntity(entity: Entities): entity is FunctionLikeEntities {
  return isConstructorEntity(entity) ||
    isFunctionEntity(entity) ||
    isMethodEntity(entity) ||
    isGetterEntity(entity) ||
    isSetterEntity(entity);
}

export function isGetterEntity(entity: Entities): entity is GetterEntity {
  return entity.kind === EntityKind.Getter;
}

export function isInterfaceEntity(entity: Entities): entity is InterfaceEntity {
  return entity.kind === EntityKind.Interface;
}

export function isMethodEntity(entity: Entities): entity is MethodEntity {
  return entity.kind === EntityKind.Method;
}

export function isModuleEntity(entity: Entities): entity is ModuleEntity {
  return entity.kind === EntityKind.Module;
}

export function isNamespaceEntity(entity: Entities): entity is NamespaceEntity {
  return entity.kind === EntityKind.Namespace;
}

export function isPropertyEntity(entity: Entities): entity is PropertyEntity {
  return entity.kind === EntityKind.Property;
}

export function isSetterEntity(entity: Entities): entity is SetterEntity {
  return entity.kind === EntityKind.Setter;
}

export function isSignatureEntity(entity: Entities): entity is SignatureEntity {
  return entity.kind === EntityKind.Signature;
}

export function isTypeAliasEntity(entity: Entities): entity is TypeAliasEntity {
  return entity.kind === EntityKind.TypeAlias;
}

export function isVariableEntity(entity: Entities): entity is VariableEntity {
  return entity.kind === EntityKind.Variable;
}
