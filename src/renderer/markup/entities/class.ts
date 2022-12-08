import {
  MarkupRenderer,
  RenderedClassForDocumentation,
  RenderedClassForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import { getRenderConfig } from "quickdoks:renderer:markup/utils/config.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { Class } from "quickdoks:types:types.js";

import { renderFunctionForDocumentation, renderFunctionForTableOfContents } from "./function.js";
import { renderPropertyForDocumentation, renderPropertyForTableOfContents } from "./property.js";


export function renderClassForTableOfContents(ctx: RenderContext<MarkupRenderer>, classType: Class): RenderedClassForTableOfContents {

  const renderConfig = getRenderConfig(ctx);
  const name = renderLink(ctx, classType.name, classType.id);

  let constructors: RenderedClassForTableOfContents[1][0];
  let properties: RenderedClassForTableOfContents[1][0];
  let methods: RenderedClassForTableOfContents[1][0];
  let setters: RenderedClassForTableOfContents[1][0];
  let getters: RenderedClassForTableOfContents[1][0];

  if(classType.ctor !== undefined){
    const constructorTitle = renderConfig.categoryNames.constructor;
    classType.ctor.name = "constructor";
    const renderedConstructor = renderFunctionForTableOfContents(ctx, classType.ctor);
    constructors = [[constructorTitle, [renderedConstructor]]];
  }
  if(classType.properties !== undefined && classType.properties.length > 0){
    const propertiesTitle = renderConfig.categoryNames.properties;
    const renderedProperties = classType.properties.map(property => renderPropertyForTableOfContents(ctx, property));

    properties = [[propertiesTitle, [renderedProperties]]];
  }
  if(classType.methods !== undefined && classType.methods.length > 0){
    const nameTitle = renderConfig.categoryNames.methods;
    const renderedMethods = classType.methods.reduce<string[]>((acc, method) => {
      acc.push(...renderFunctionForTableOfContents(ctx, method));
      return acc;
    }, []);

    methods = [[nameTitle, [renderedMethods]]];
  }
  if(classType.setters !== undefined && classType.setters.length > 0){
    const settersTitle = renderConfig.categoryNames.setters;
    const renderedSetters = classType.setters.map(setter => renderFunctionForTableOfContents(ctx, setter));

    setters = [[settersTitle, renderedSetters]];
  }
  if(classType.getters !== undefined && classType.getters.length > 0){
    const gettersTitle = renderConfig.categoryNames.getters;
    const renderedGetters = classType.getters.map(getter => renderFunctionForTableOfContents(ctx, getter));

    getters = [[gettersTitle, renderedGetters]];
  }

  return [
    name,
    [
      constructors,
      properties,
      methods,
      setters,
      getters
    ]
  ];

}


export function renderClassForDocumentation(ctx: RenderContext<MarkupRenderer>, classEntity: Class): RenderedClassForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const className = renderLink(ctx, classEntity.name, classEntity.id);

  const description = classEntity.description;
  const example = classEntity.example;

  let constructor: RenderedClassForDocumentation[string][2] | undefined;
  let properties: RenderedClassForDocumentation[string][3] | undefined;
  let methods: RenderedClassForDocumentation[string][4] | undefined;
  let setters: RenderedClassForDocumentation[string][5] | undefined;
  let getters: RenderedClassForDocumentation[string][6] | undefined;

  if(classEntity.ctor !== undefined){
    const constructorTitle = renderConfig.categoryNames.constructor;
    const renderedConstructor = renderFunctionForDocumentation(ctx, classEntity.ctor);

    constructor = { [constructorTitle]: renderedConstructor };
  }
  if(classEntity.properties !== undefined && classEntity.properties.length > 0){
    const propertiesTitle = renderConfig.categoryNames.properties;
    const renderedProperties = classEntity.properties.map(property => renderPropertyForDocumentation(ctx, property));

    properties = { [propertiesTitle]: renderedProperties };
  }
  if(classEntity.methods !== undefined && classEntity.methods.length > 0){
    const methodsTitle = renderConfig.categoryNames.methods;
    const renderedMethods = classEntity.methods.map(method => renderFunctionForDocumentation(ctx, method));

    methods = { [methodsTitle]: renderedMethods };
  }
  if(classEntity.setters !== undefined && classEntity.setters.length > 0){
    const settersTitle = renderConfig.categoryNames.setters;
    const renderedSetters = classEntity.setters.map(setter => renderFunctionForDocumentation(ctx, setter));

    setters = { [settersTitle]: renderedSetters };
  }
  if(classEntity.getters !== undefined && classEntity.getters.length > 0){
    const gettersTitle = renderConfig.categoryNames.getters;
    const renderedGetters = classEntity.getters.map(getter => renderFunctionForDocumentation(ctx, getter));

    getters = { [gettersTitle]: renderedGetters };
  }

  return {
    [className]: [
      description,
      example,
      constructor,
      properties,
      methods,
      setters,
      getters
    ]
  };

}
