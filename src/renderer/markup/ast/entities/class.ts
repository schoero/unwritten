import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderFunctionEntityForDocumentation, renderFunctionEntityForTableOfContents } from "./function.js";
import { renderPropertyForDocumentation, renderPropertyForTableOfContents } from "./property.js";

import type { ClassEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedClassForDocumentation,
  RenderedClassForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderClassForTableOfContents(ctx: MarkupRenderContext, classEntity: ClassEntity): RenderedClassForTableOfContents {

  const renderConfig = getRenderConfig(ctx);
  const name = renderLink(ctx, classEntity.name, classEntity.id);

  let constructors: RenderedClassForTableOfContents[1][0];
  let properties: RenderedClassForTableOfContents[1][0];
  let methods: RenderedClassForTableOfContents[1][0];
  let setters: RenderedClassForTableOfContents[1][0];
  let getters: RenderedClassForTableOfContents[1][0];

  if(classEntity.ctor !== undefined){
    const constructorTitle = renderConfig.categoryNames.constructor;
    classEntity.ctor.name = "constructor";
    const renderedConstructor = renderFunctionEntityForTableOfContents(ctx, classEntity.ctor);
    constructors = [[constructorTitle, [renderedConstructor]]];
  }
  if(classEntity.properties.length > 0){
    const propertiesTitle = renderConfig.categoryNames.properties;
    const renderedProperties = classEntity.properties.map(property => renderPropertyForTableOfContents(ctx, property));

    properties = [[propertiesTitle, [renderedProperties]]];
  }
  if(classEntity.methods.length > 0){
    const nameTitle = renderConfig.categoryNames.methods;
    const renderedMethods = classEntity.methods.reduce<string[]>((acc, method) => {
      acc.push(...renderFunctionEntityForTableOfContents(ctx, method));
      return acc;
    }, []);

    methods = [[nameTitle, [renderedMethods]]];
  }
  if(classEntity.setters.length > 0){
    const settersTitle = renderConfig.categoryNames.setters;
    const renderedSetters = classEntity.setters.map(setter => renderFunctionEntityForTableOfContents(ctx, setter));

    setters = [[settersTitle, renderedSetters]];
  }
  if(classEntity.getters.length > 0){
    const gettersTitle = renderConfig.categoryNames.getters;
    const renderedGetters = classEntity.getters.map(getter => renderFunctionEntityForTableOfContents(ctx, getter));

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


export function renderClassForDocumentation(ctx: MarkupRenderContext, classEntity: ClassEntity): RenderedClassForDocumentation {

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
    const renderedConstructor = renderFunctionEntityForDocumentation(ctx, classEntity.ctor);

    constructor = { [constructorTitle]: renderedConstructor };
  }
  if(classEntity.properties.length > 0){
    const propertiesTitle = renderConfig.categoryNames.properties;
    const renderedProperties = classEntity.properties.map(property => renderPropertyForDocumentation(ctx, property));

    properties = { [propertiesTitle]: renderedProperties };
  }
  if(classEntity.methods.length > 0){
    const methodsTitle = renderConfig.categoryNames.methods;
    const renderedMethods = classEntity.methods.map(method => renderFunctionEntityForDocumentation(ctx, method));

    methods = { [methodsTitle]: renderedMethods };
  }
  if(classEntity.setters.length > 0){
    const settersTitle = renderConfig.categoryNames.setters;
    const renderedSetters = classEntity.setters.map(setter => renderFunctionEntityForDocumentation(ctx, setter));

    setters = { [settersTitle]: renderedSetters };
  }
  if(classEntity.getters.length > 0){
    const gettersTitle = renderConfig.categoryNames.getters;
    const renderedGetters = classEntity.getters.map(getter => renderFunctionEntityForDocumentation(ctx, getter));

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
