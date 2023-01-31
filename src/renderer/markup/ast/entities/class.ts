import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderFunctionForDocumentation, renderFunctionForTableOfContents } from "./function.js";
import { renderPropertyForDocumentation, renderPropertyForTableOfContents } from "./property.js";

import type { ClassEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedClassForDocumentation,
  RenderedClassForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderClassForTableOfContents(ctx: RenderContext<MarkupRenderer>, classEntity: ClassEntity): RenderedClassForTableOfContents {

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
    const renderedConstructor = renderFunctionForTableOfContents(ctx, classEntity.ctor);
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
      acc.push(...renderFunctionForTableOfContents(ctx, method));
      return acc;
    }, []);

    methods = [[nameTitle, [renderedMethods]]];
  }
  if(classEntity.setters.length > 0){
    const settersTitle = renderConfig.categoryNames.setters;
    const renderedSetters = classEntity.setters.map(setter => renderFunctionForTableOfContents(ctx, setter));

    setters = [[settersTitle, renderedSetters]];
  }
  if(classEntity.getters.length > 0){
    const gettersTitle = renderConfig.categoryNames.getters;
    const renderedGetters = classEntity.getters.map(getter => renderFunctionForTableOfContents(ctx, getter));

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


export function renderClassForDocumentation(ctx: RenderContext<MarkupRenderer>, classEntity: ClassEntity): RenderedClassForDocumentation {

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
  if(classEntity.properties.length > 0){
    const propertiesTitle = renderConfig.categoryNames.properties;
    const renderedProperties = classEntity.properties.map(property => renderPropertyForDocumentation(ctx, property));

    properties = { [propertiesTitle]: renderedProperties };
  }
  if(classEntity.methods.length > 0){
    const methodsTitle = renderConfig.categoryNames.methods;
    const renderedMethods = classEntity.methods.map(method => renderFunctionForDocumentation(ctx, method));

    methods = { [methodsTitle]: renderedMethods };
  }
  if(classEntity.setters.length > 0){
    const settersTitle = renderConfig.categoryNames.setters;
    const renderedSetters = classEntity.setters.map(setter => renderFunctionForDocumentation(ctx, setter));

    setters = { [settersTitle]: renderedSetters };
  }
  if(classEntity.getters.length > 0){
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