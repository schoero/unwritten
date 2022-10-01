
import { CompilerConfig, Complete, Config, Encapsulation, ExternalTypes, RenderConfig } from "../types/config.js";
import { EntityKind } from "../types/types.js";
import { defaultCompilerConfig, defaultExternalTypes, defaultRenderConfig } from "./default.js";


let _config: Config | undefined;

interface FinalRenderConfig extends Omit<Complete<RenderConfig>, "parameterEncapsulation" | "typeEncapsulation"> {
  literalTypeEncapsulation: Encapsulation;
  parameterEncapsulation: Encapsulation;
  propertyEncapsulation: Encapsulation;
  tagEncapsulation: Encapsulation;
  typeEncapsulation: Encapsulation;
}

interface FinalCompilerConfig extends Complete<CompilerConfig> {

}

export function setConfig(config: Config) {
  _config = config;
}

const compilerConfig: FinalCompilerConfig = {

  get exclude() {
    return _config?.compilerConfig?.exclude ?? defaultCompilerConfig.exclude;
  }

};

const renderConfig: FinalRenderConfig = {

  // get categoryNames() {
  //   return categoryNames;
  // },

  get literalTypeEncapsulation() {
    if(_config?.renderConfig?.literalTypeEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.literalTypeEncapsulation === "object"){
      return _config.renderConfig.literalTypeEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.literalTypeEncapsulation;
  },

  get parameterEncapsulation() {
    if(_config?.renderConfig?.parameterEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.parameterEncapsulation === "object"){
      return _config.renderConfig.parameterEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.parameterEncapsulation;
  },

  get propertyEncapsulation() {
    if(_config?.renderConfig?.propertyEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.propertyEncapsulation === "object"){
      return _config.renderConfig.propertyEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.propertyEncapsulation;
  },

  // get renderOrder() {
  //   if(typeof _config?.renderConfig?.renderOrder === "object"){
  //     return _config.renderConfig.renderOrder;
  //   }
  //   return defaultRenderConfig.renderOrder;
  // },


  get tagEncapsulation() {
    if(_config?.renderConfig?.tagEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.tagEncapsulation === "object"){
      return _config.renderConfig.tagEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.tagEncapsulation;
  },


  get typeEncapsulation() {
    if(_config?.renderConfig?.typeEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.typeEncapsulation === "object"){
      return _config.renderConfig.typeEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.typeEncapsulation;
  }

};

export function getConfig(): Complete<Config> {
  return {
    compilerConfig,
    externalTypes,
    renderConfig
  };
}

export function getCompilerConfig(): FinalCompilerConfig {
  return compilerConfig;
}

export function getRenderConfig(): FinalRenderConfig {
  return renderConfig;
}

export function getExternalTypes(): ExternalTypes {
  return externalTypes;
}

export function getTypeSource(EntityKind: keyof typeof externalTypes): string | undefined {
  return externalTypes[EntityKind];
}


// const categoryNames: Complete<CategoryNames> = {

//   [RenderCategories.Function]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Function] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Function]!,
//   [RenderCategories.Functions]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Functions] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Functions]!,

//   [RenderCategories.Class]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Class] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Class]!,
//   [RenderCategories.Classes]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Classes] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Classes]!,

//   [RenderCategories.Constructor]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Constructor] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Constructor]!,
//   [RenderCategories.Constructors]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Constructors] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Constructors]!,

//   [RenderCategories.Property]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Property] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Property]!,
//   [RenderCategories.Properties]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Properties] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Properties]!,

//   [RenderCategories.Method]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Method] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Method]!,
//   [RenderCategories.Methods]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Methods] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Methods]!,

//   [RenderCategories.Setter]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Setter] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Setter]!,
//   [RenderCategories.Setters]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Setters] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Setters]!,

//   [RenderCategories.Getter]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Getter] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Getter]!,
//   [RenderCategories.Getters]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Getters] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Getters]!,

//   [RenderCategories.TypeAlias]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.TypeAlias] ??
//     defaultRenderConfig.categoryNames[RenderCategories.TypeAlias]!,
//   [RenderCategories.TypeAliases]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.TypeAliases] ??
//     defaultRenderConfig.categoryNames[RenderCategories.TypeAliases]!,

//   [RenderCategories.Enum]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Enum] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Enum]!,
//   [RenderCategories.Enums]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Enums] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Enums]!,

//   [RenderCategories.Interface]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Interface] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Interface]!,
//   [RenderCategories.Interfaces]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Interfaces] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Interfaces]!,

//   [RenderCategories.Variable]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Variable] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Variable]!,
//   [RenderCategories.Variables]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Variables] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Variables]!,

//   [RenderCategories.Namespace]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Namespace] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Namespace]!,
//   [RenderCategories.Namespaces]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Namespaces] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Namespaces]!,

//   [RenderCategories.Module]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Module] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Module]!,
//   [RenderCategories.Modules]:
//     _config?.renderConfig?.categoryNames?.[RenderCategories.Modules] ??
//     defaultRenderConfig.categoryNames[RenderCategories.Modules]!

// };


const externalTypes: ExternalTypes = {

  [EntityKind.String]:
    _config?.externalTypes?.[EntityKind.String] ??
    defaultExternalTypes[EntityKind.String]!,

  [EntityKind.Number]:
    _config?.externalTypes?.[EntityKind.Number] ??
    defaultExternalTypes[EntityKind.Number]!,

  [EntityKind.Boolean]:
    _config?.externalTypes?.[EntityKind.Boolean] ??
    defaultExternalTypes[EntityKind.Boolean]!,

  [EntityKind.BigInt]:
    _config?.externalTypes?.[EntityKind.BigInt] ??
    defaultExternalTypes[EntityKind.BigInt]!,

  [EntityKind.Object]:
    _config?.externalTypes?.[EntityKind.Object] ??
    defaultExternalTypes[EntityKind.Object]!,

  [EntityKind.Array]:
    _config?.externalTypes?.[EntityKind.Array] ??
    defaultExternalTypes[EntityKind.Array]!,

  [EntityKind.Promise]:
    _config?.externalTypes?.[EntityKind.Promise] ??
    defaultExternalTypes[EntityKind.Promise]!,

  [EntityKind.Function]:
    _config?.externalTypes?.[EntityKind.Function] ??
    defaultExternalTypes[EntityKind.Function]!,

  [EntityKind.Symbol]:
    _config?.externalTypes?.[EntityKind.Symbol] ??
    defaultExternalTypes[EntityKind.Symbol]!,

  [EntityKind.Undefined]:
    _config?.externalTypes?.[EntityKind.Undefined] ??
    defaultExternalTypes[EntityKind.Undefined]!,

  [EntityKind.Null]:
    _config?.externalTypes?.[EntityKind.Null] ??
    defaultExternalTypes[EntityKind.Null]!

};


export const config = {
  compilerConfig,
  externalTypes,
  renderConfig
};