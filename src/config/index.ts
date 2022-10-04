
import { CompilerConfig, Complete, Config, Encapsulation, ExternalTypes, RenderConfig } from "../types/config.js";
import { TypeKind } from "../types/types.js";
import { defaultCompilerConfig, defaultExternalTypes, defaultRenderConfig } from "./default.js";


let _config: Config | undefined;

interface FinalRenderConfig extends Omit<Complete<RenderConfig>, "parameterEncapsulation" | "typeEncapsulation"> {
  stringLiteralTypeEncapsulation: Encapsulation;
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

  get stringLiteralTypeEncapsulation() {
    if(_config?.renderConfig?.stringLiteralTypeEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.stringLiteralTypeEncapsulation === "object"){
      return _config.renderConfig.stringLiteralTypeEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.stringLiteralTypeEncapsulation;
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

  [TypeKind.String]:
    _config?.externalTypes?.[TypeKind.String] ??
    defaultExternalTypes[TypeKind.String]!,

  [TypeKind.Number]:
    _config?.externalTypes?.[TypeKind.Number] ??
    defaultExternalTypes[TypeKind.Number]!,

  [TypeKind.Boolean]:
    _config?.externalTypes?.[TypeKind.Boolean] ??
    defaultExternalTypes[TypeKind.Boolean]!,

  [TypeKind.BigInt]:
    _config?.externalTypes?.[TypeKind.BigInt] ??
    defaultExternalTypes[TypeKind.BigInt]!,

  [TypeKind.Object]:
    _config?.externalTypes?.[TypeKind.Object] ??
    defaultExternalTypes[TypeKind.Object]!,

  [TypeKind.Array]:
    _config?.externalTypes?.[TypeKind.Array] ??
    defaultExternalTypes[TypeKind.Array]!,

  [TypeKind.Promise]:
    _config?.externalTypes?.[TypeKind.Promise] ??
    defaultExternalTypes[TypeKind.Promise]!,

  [TypeKind.Function]:
    _config?.externalTypes?.[TypeKind.Function] ??
    defaultExternalTypes[TypeKind.Function]!,

  [TypeKind.Symbol]:
    _config?.externalTypes?.[TypeKind.Symbol] ??
    defaultExternalTypes[TypeKind.Symbol]!,

  [TypeKind.Undefined]:
    _config?.externalTypes?.[TypeKind.Undefined] ??
    defaultExternalTypes[TypeKind.Undefined]!,

  [TypeKind.Null]:
    _config?.externalTypes?.[TypeKind.Null] ??
    defaultExternalTypes[TypeKind.Null]!

};


export const config = {
  compilerConfig,
  externalTypes,
  renderConfig
};