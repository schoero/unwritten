import { EntityKind } from "quickdoks:compiler:enums/entities.js";

import type {
  ClassEntity,
  Entities,
  EnumEntity,
  ExportableEntities,
  ExpressionEntity,
  FunctionEntity,
  GetterEntity,
  InterfaceEntity,
  NamespaceEntity,
  TypeAliasEntity,
  VariableEntity
} from "quickdoks:compiler:type-definitions/entities.d.js";


export function isClassType(entity: Entities): entity is ClassEntity {
  return entity.kind === EntityKind.Class;
}

export function isEnumType(entity: Entities): entity is EnumEntity {
  return entity.kind === EntityKind.Enum;
}

export function isExportableEntity(entity: Entities): entity is ExportableEntities {
  return isClassType(entity) ||
    isEnumType(entity) ||
    isFunctionEntity(entity) ||
    isInterfaceEntity(entity) ||
    isNamespaceEntity(entity) ||
    isTypeAliasEntity(entity) ||
    isVariableEntity(entity);
}

export function isExpressionEntity(entity: Entities): entity is ExpressionEntity {
  return entity.kind === EntityKind.Expression;
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

export function isTypeAliasEntity(entity: Entities): entity is TypeAliasEntity {
  return entity.kind === EntityKind.TypeAlias;
}

export function isVariableEntity(entity: Entities): entity is VariableEntity {
  return entity.kind === EntityKind.Variable;
}
