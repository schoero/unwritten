import { EntityKind } from "unwritten:compiler:enums/entities.js";

import type {
  ClassEntity,
  Entities,
  EnumEntity,
  ExportableEntities,
  FunctionEntity,
  GetterEntity,
  InterfaceEntity,
  NamespaceEntity,
  PropertyEntity,
  SignatureEntity,
  TypeAliasEntity,
  VariableEntity
} from "unwritten:compiler:type-definitions/entities.d.js";


export function isClassEntity(entity: Entities): entity is ClassEntity {
  return entity.kind === EntityKind.Class;
}

export function isEnumEntity(entity: Entities): entity is EnumEntity {
  return entity.kind === EntityKind.Enum;
}

export function isExportableEntity(entity: Entities): entity is ExportableEntities {
  return isClassEntity(entity) ||
    isEnumEntity(entity) ||
    isFunctionEntity(entity) ||
    isInterfaceEntity(entity) ||
    isNamespaceEntity(entity) ||
    isTypeAliasEntity(entity) ||
    isVariableEntity(entity);
}

export function isFunctionEntity(entity: Entities): entity is FunctionEntity {
  return entity.kind === EntityKind.Function;
}

export function isGetterEntity(entity: Entities): entity is GetterEntity {
  return entity.kind === EntityKind.Getter;
}

export function isInterfaceEntity(entity: Entities): entity is InterfaceEntity {
  return entity.kind === EntityKind.Interface;
}

export function isNamespaceEntity(entity: Entities): entity is NamespaceEntity {
  return entity.kind === EntityKind.Namespace;
}

export function isPropertyEntity(entity: Entities): entity is PropertyEntity {
  return entity.kind === EntityKind.Property;
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
