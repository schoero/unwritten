import { CategoryNames, RenderCategories } from "src/types/renderer.js";
import { TypeKind } from "types/types.js";
import { Complete, Config, Encapsulation, RenderConfig, TypeSources } from "../../types/config.js";
import { defaultRenderConfig } from "./default-renderconfig.js";
import { defaultTypeSources } from "./default-typescources.js";


let _config: Config | undefined;

interface FinalRenderConfig extends Omit<Complete<RenderConfig>, "typeEncapsulation" | "parameterEncapsulation"> {
  typeEncapsulation: Encapsulation;
  parameterEncapsulation: Encapsulation;
  propertyEncapsulation: Encapsulation;
  tagEncapsulation: Encapsulation;
  literalTypeEncapsulation: Encapsulation;
}

export function setConfig(config: Config) {
  _config = config;
}

const renderConfig: FinalRenderConfig = {

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

  get typeEncapsulation() {
    if(_config?.renderConfig?.typeEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.typeEncapsulation === "object"){
      return _config.renderConfig.typeEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.typeEncapsulation;
  },

  get linkBasicTypesToExternalDocs() {
    if(typeof _config?.renderConfig?.linkBasicTypesToExternalDocs === "boolean"){
      return _config.renderConfig.linkBasicTypesToExternalDocs;
    } else {
      return defaultRenderConfig.linkBasicTypesToExternalDocs;
    }
  },

  get tagEncapsulation() {
    if(_config?.renderConfig?.tagEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.tagEncapsulation === "object"){
      return _config.renderConfig.tagEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.tagEncapsulation;
  },

  get literalTypeEncapsulation() {
    if(_config?.renderConfig?.literalTypeEncapsulation === false){
      return <Encapsulation>["", ""];
    } else if(typeof _config?.renderConfig?.literalTypeEncapsulation === "object"){
      return _config.renderConfig.literalTypeEncapsulation;
    }
    return <Encapsulation>defaultRenderConfig.literalTypeEncapsulation;
  },


  get renderOrder() {
    if(typeof _config?.renderConfig?.renderOrder === "object"){
      return _config.renderConfig.renderOrder;
    }
    return defaultRenderConfig.renderOrder;
  },


  get categoryNames() {
    return categoryNames;
  }

};

export function getConfig(): Complete<Config> {
  return {
    renderConfig,
    typeSources
  };
}

export function getRenderConfig(): FinalRenderConfig {
  return renderConfig;
}

export function getTypeSources(): TypeSources {
  return typeSources;
}

export function getTypeSource(typeKind: keyof typeof typeSources): string | undefined {
  return typeSources[typeKind];
}


const categoryNames: Complete<CategoryNames> = {

  [RenderCategories.Function]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Function] ??
    defaultRenderConfig.categoryNames[RenderCategories.Function]!,
  [RenderCategories.Functions]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Functions] ??
    defaultRenderConfig.categoryNames[RenderCategories.Functions]!,

  [RenderCategories.Class]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Class] ??
    defaultRenderConfig.categoryNames[RenderCategories.Class]!,
  [RenderCategories.Classes]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Classes] ??
    defaultRenderConfig.categoryNames[RenderCategories.Classes]!,

  [RenderCategories.Constructor]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Constructor] ??
    defaultRenderConfig.categoryNames[RenderCategories.Constructor]!,
  [RenderCategories.Constructors]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Constructors] ??
    defaultRenderConfig.categoryNames[RenderCategories.Constructors]!,

  [RenderCategories.Property]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Property] ??
    defaultRenderConfig.categoryNames[RenderCategories.Property]!,
  [RenderCategories.Properties]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Properties] ??
    defaultRenderConfig.categoryNames[RenderCategories.Properties]!,

  [RenderCategories.Method]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Method] ??
    defaultRenderConfig.categoryNames[RenderCategories.Method]!,
  [RenderCategories.Methods]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Methods] ??
    defaultRenderConfig.categoryNames[RenderCategories.Methods]!,

  [RenderCategories.Setter]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Setter] ??
    defaultRenderConfig.categoryNames[RenderCategories.Setter]!,
  [RenderCategories.Setters]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Setters] ??
    defaultRenderConfig.categoryNames[RenderCategories.Setters]!,

  [RenderCategories.Getter]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Getter] ??
    defaultRenderConfig.categoryNames[RenderCategories.Getter]!,
  [RenderCategories.Getters]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Getters] ??
    defaultRenderConfig.categoryNames[RenderCategories.Getters]!,

  [RenderCategories.TypeAlias]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.TypeAlias] ??
    defaultRenderConfig.categoryNames[RenderCategories.TypeAlias]!,
  [RenderCategories.TypeAliases]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.TypeAliases] ??
    defaultRenderConfig.categoryNames[RenderCategories.TypeAliases]!,

  [RenderCategories.Enum]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Enum] ??
    defaultRenderConfig.categoryNames[RenderCategories.Enum]!,
  [RenderCategories.Enums]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Enums] ??
    defaultRenderConfig.categoryNames[RenderCategories.Enums]!,

  [RenderCategories.Interface]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Interface] ??
    defaultRenderConfig.categoryNames[RenderCategories.Interface]!,
  [RenderCategories.Interfaces]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Interfaces] ??
    defaultRenderConfig.categoryNames[RenderCategories.Interfaces]!,

  [RenderCategories.Variable]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Variable] ??
    defaultRenderConfig.categoryNames[RenderCategories.Variable]!,
  [RenderCategories.Variables]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Variables] ??
    defaultRenderConfig.categoryNames[RenderCategories.Variables]!,

  [RenderCategories.Namespace]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Namespace] ??
    defaultRenderConfig.categoryNames[RenderCategories.Namespace]!,
  [RenderCategories.Namespaces]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Namespaces] ??
    defaultRenderConfig.categoryNames[RenderCategories.Namespaces]!,

  [RenderCategories.Module]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Module] ??
    defaultRenderConfig.categoryNames[RenderCategories.Module]!,
  [RenderCategories.Modules]:
    _config?.renderConfig?.categoryNames?.[RenderCategories.Modules] ??
    defaultRenderConfig.categoryNames[RenderCategories.Modules]!

};


const typeSources: Complete<TypeSources> = {

  [TypeKind.String]:
    _config?.typeSources?.[TypeKind.String] ??
    defaultTypeSources[TypeKind.String],

  [TypeKind.Number]:
    _config?.typeSources?.[TypeKind.Number] ??
    defaultTypeSources[TypeKind.Number],

  [TypeKind.Boolean]:
    _config?.typeSources?.[TypeKind.Boolean] ??
    defaultTypeSources[TypeKind.Boolean],

  [TypeKind.BigInt]:
    _config?.typeSources?.[TypeKind.BigInt] ??
    defaultTypeSources[TypeKind.BigInt],

  [TypeKind.Object]:
    _config?.typeSources?.[TypeKind.Object] ??
    defaultTypeSources[TypeKind.Object],

  [TypeKind.Array]:
    _config?.typeSources?.[TypeKind.Array] ??
    defaultTypeSources[TypeKind.Array],

  [TypeKind.Function]:
    _config?.typeSources?.[TypeKind.Function] ??
    defaultTypeSources[TypeKind.Function],

  [TypeKind.Symbol]:
    _config?.typeSources?.[TypeKind.Symbol] ??
    defaultTypeSources[TypeKind.Symbol],

  [TypeKind.Undefined]:
    _config?.typeSources?.[TypeKind.Undefined] ??
    defaultTypeSources[TypeKind.Undefined],

  [TypeKind.Null]:
    _config?.typeSources?.[TypeKind.Null] ??
    defaultTypeSources[TypeKind.Null]

};


export const config = {
  renderConfig: renderConfig,
  typeSources: typeSources
};