import { getRenderConfig } from "renderer/config/index.js";
import { RenderedClassForDocumentation, RenderedClassForTableOfContents } from "src/types/renderer.js";
import { renderLink } from "src/utils/renderer.js";
import { ClassEntity } from "../../types/entities.js";
import { renderFunctionEntityForDocumentation, renderFunctionEntityForTableOfContents } from "./function.js";
import { renderPropertyEntityForDocumentation, renderPropertyEntityForTableOfContents } from "./property.js";


export function renderClassEntityForTableOfContents(classEntity: ClassEntity): RenderedClassForTableOfContents {

  const renderConfig = getRenderConfig();
  const name = renderLink(classEntity.name, classEntity.id);

  let constructors: RenderedClassForTableOfContents[1][0];
  let properties: RenderedClassForTableOfContents[1][0];
  let methods: RenderedClassForTableOfContents[1][0];
  let setters: RenderedClassForTableOfContents[1][0];
  let getters: RenderedClassForTableOfContents[1][0];

  if(classEntity.ctor !== undefined){
    const constructorTitle = renderConfig.categoryNames.constructor;
    const renderedConstructor = renderFunctionEntityForTableOfContents(classEntity.ctor);
    constructors = [[constructorTitle, [renderedConstructor]]];
  }
  if(classEntity.properties !== undefined){
    const propertiesTitle = renderConfig.categoryNames.properties;
    const renderedProperties = classEntity.properties.map(renderPropertyEntityForTableOfContents);
    properties = [[propertiesTitle, [renderedProperties]]];
  }
  if(classEntity.methods !== undefined && classEntity.methods.length > 0){
    const nameTitle = renderConfig.categoryNames.methods;
    const renderedMethods = classEntity.methods.reduce((acc, method) => {
      acc.push(...renderFunctionEntityForTableOfContents(method));
      return acc;
    }, <string[]>[]);
    methods = [[nameTitle, [renderedMethods]]];
  }
  if(classEntity.setters !== undefined){
    const settersTitle = renderConfig.categoryNames.setters;
    const renderedSetters = classEntity.setters.map(renderFunctionEntityForTableOfContents);
    setters = [[settersTitle, renderedSetters]];
  }
  if(classEntity.getters !== undefined){
    const gettersTitle = renderConfig.categoryNames.getters;
    const renderedGetters = classEntity.getters.map(renderFunctionEntityForTableOfContents);
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


export function renderClassEntityForDocumentation(classEntity: ClassEntity): RenderedClassForDocumentation {

  const renderConfig = getRenderConfig();
  const className = renderLink(classEntity.name, classEntity.id);
  const description = classEntity.description;

  let constructor: RenderedClassForDocumentation[string][1] | undefined;
  let properties: RenderedClassForDocumentation[string][2] | undefined;
  let methods: RenderedClassForDocumentation[string][3] | undefined;
  let setters: RenderedClassForDocumentation[string][4] | undefined;
  let getters: RenderedClassForDocumentation[string][5] | undefined;

  if(classEntity.ctor !== undefined){
    const constructorTitle = renderConfig.categoryNames.constructor;
    const renderedConstructor = renderFunctionEntityForDocumentation(classEntity.ctor);
    constructor = { [constructorTitle]: renderedConstructor };
  }
  if(classEntity.properties !== undefined){
    const propertiesTitle = renderConfig.categoryNames.properties;
    const renderedProperties = classEntity.properties.map(renderPropertyEntityForDocumentation);
    properties = { [propertiesTitle]: renderedProperties };
  }
  if(classEntity.methods !== undefined){
    const methodsTitle = renderConfig.categoryNames.methods;
    const renderedMethods = classEntity.methods.map(renderFunctionEntityForDocumentation);
    methods = { [methodsTitle]: renderedMethods };
  }
  if(classEntity.setters !== undefined){
    const settersTitle = renderConfig.categoryNames.setters;
    const renderedSetters = classEntity.setters.map(renderFunctionEntityForDocumentation);
    setters = { [settersTitle]: renderedSetters };
  }
  if(classEntity.getters !== undefined){
    const gettersTitle = renderConfig.categoryNames.getters;
    const renderedGetters = classEntity.getters.map(renderFunctionEntityForDocumentation);
    getters = { [gettersTitle]: renderedGetters };
  }

  return {
    [className]: [
      description,
      constructor,
      properties,
      methods,
      setters,
      getters
    ]
  };

}