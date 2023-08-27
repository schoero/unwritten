import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { isSignatureEntity } from "unwritten:typeguards/entities.js";
import { isInterfaceType } from "unwritten:typeguards/types.js";

import type {
  ClassEntity,
  ConstructorEntity,
  GetterEntity,
  InterfaceEntity,
  MergedInterfaceEntity,
  MethodEntity,
  PropertyEntity,
  SetterEntity
} from "unwritten:interpreter/type-definitions/entities.js";


type EntityKeys = "events" | "getters" | "methods" | "properties" | "setters";
type EntityMap = {
  [Key in EntityKeys]: Key extends "events" | "properties"
    ? PropertyEntity
    : Key extends "getters"
      ? GetterEntity
      : Key extends "setters"
        ? SetterEntity
        : Key extends "methods"
          ? MethodEntity
          : never;
};


export function extendClassEntityConstructorsWithHeritage(classEntity: ClassEntity): ConstructorEntity | undefined {

  if(classEntity.ctor){
    return classEntity.ctor;
  }

  if(classEntity.heritage?.staticType.kind === TypeKind.Object){

    if(classEntity.heritage.staticType.constructSignatures.length === 1 &&
      classEntity.heritage.staticType.constructSignatures[0].parameters === undefined){
      return;
    }

    const constructorEntity: ConstructorEntity = {
      kind: EntityKind.Constructor,
      name: classEntity.heritage.staticType.constructSignatures[0].name,
      signatures: classEntity.heritage.staticType.constructSignatures,
      symbolId: classEntity.heritage.staticType.constructSignatures[0].symbolId
    };

    return constructorEntity;

  }

}


export function extendClassEntityEntitiesWithHeritage<
  Key extends EntityKeys, Entity extends EntityMap[Key]
>(classEntity: ClassEntity, key: Key): Entity[] {

  const instanceEntities = classEntity.heritage?.instanceType.kind === TypeKind.Object ? classEntity.heritage.instanceType[key] as Entity[] : [] as Entity[];
  const staticEntities = classEntity.heritage?.staticType.kind === TypeKind.Object ? classEntity.heritage.staticType[key] as Entity[] : [] as Entity[];

  const fromHeritages = [...instanceEntities, ...staticEntities].reduce<{
    [key: string]: Entity;
  }>((result, entity) => {
    result[entity.name ?? key] = entity;
    return result;
  }, {});

  const entities = (classEntity[key] as Entity[]).reduce<{
    [key: string]: Entity;
  }>((result, entity) => {
    result[entity.name ?? key] = entity;
    return result;
  }, {});

  return Object.values({
    ...fromHeritages,
    ...entities
  });

}


export function extendInterfaceEntityPropertiesWithHeritage(interfaceEntity: InterfaceEntity | MergedInterfaceEntity, key: "events" | "properties" = "properties"): PropertyEntity[] {

  const fromHeritages = interfaceEntity.heritage?.reduce<{ [key: string]: PropertyEntity; }>((result, heritage) => {
    if(!isInterfaceType(heritage.instanceType)){
      return result;
    }
    heritage.instanceType[key].forEach(
      property => {
        result[property.name] = property;
      }
    );
    return result;
  }, {});

  const properties = interfaceEntity[key].reduce<{
    [key: string]: PropertyEntity;
  }>((result, property) => {
    result[property.name] = property;
    return result;
  }, {});

  return Object.values({
    ...fromHeritages,
    ...properties
  });

}

type SignatureKeys = "callSignatures" | "constructSignatures" | "getterSignatures" | "methodSignatures" | "setterSignatures";


export function extendInterfaceEntitySignaturesWithHeritage<Key extends SignatureKeys>(interfaceEntity: InterfaceEntity | MergedInterfaceEntity, key: Key): InterfaceEntity[Key] {

  const map = {
    callSignatures: "callSignatures",
    constructSignatures: "constructSignatures",
    getterSignatures: "getters",
    methodSignatures: "methods",
    setterSignatures: "setters"
  } as const;

  const fromHeritages = interfaceEntity.heritage?.reduceRight<{
    [MapKey in keyof typeof map as string]: InterfaceEntity[MapKey];
  }>((result, heritage) => {
    if(!isInterfaceType(heritage.instanceType)){
      return result;
    }
    heritage.instanceType[map[key]].forEach(
      entity => {
        if(isSignatureEntity(entity)){
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Bug in eslint rule
          result[entity.name ?? key] ??= [];
          result[entity.name ?? key].push(entity);
        } else {
          result[entity.name!] = entity.signatures;
        }
      }
    );
    return result;
  }, {});

  const groupedSignatures = interfaceEntity[key].reduceRight<{
    [key: string]: InterfaceEntity[Key];
  }>((result, signatureEntity) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Bug in eslint rule
    result[signatureEntity.name ?? key] ??= [];
    result[signatureEntity.name ?? key].push(signatureEntity);
    return result;
  }, {});

  return Object.values({
    ...fromHeritages,
    ...groupedSignatures
  }).flat();

}
