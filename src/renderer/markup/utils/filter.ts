import { getRenderConfig } from "unwritten:renderer/utils/config";
import { isFunctionLikeEntity } from "unwritten:typeguards/entities";

import type {
  ExplicitSignatureEntity,
  ExportableEntity,
  FunctionLikeEntity,
  PropertyEntity,
  SignatureEntity
} from "unwritten:interpreter:type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup";


export function filterExportableEntities(ctx: MarkupRenderContext, entities: ExportableEntity[]): ExportableEntity[] {

  const renderInternal = ctx.config.renderConfig[ctx.renderer.name].renderInternalEntities;

  if(renderInternal){
    return entities;
  }

  return entities.filter(entity => {
    if(isFunctionLikeEntity(entity)){
      return entity.signatures.every(signature => !signature.internal);
    }
    return !entity.internal;
  });

}


export function implicitSignatureFilter(signature: SignatureEntity): signature is ExplicitSignatureEntity {
  return signature.declarationId !== undefined;
}

export function internalMemberFilter<Entity extends FunctionLikeEntity | PropertyEntity>(this: MarkupRenderContext, entity: Entity | undefined): boolean {
  if(entity === undefined){
    return false;
  }

  const renderConfig = getRenderConfig(this);

  if(renderConfig.renderInternalEntities){
    return true;
  }

  if(isFunctionLikeEntity(entity)){
    return entity.signatures.every(signature => !signature.internal);
  }

  return !entity.internal;
}

export function internalSignatureFilter(this: MarkupRenderContext, signature: SignatureEntity | undefined): boolean {
  if(signature === undefined){
    return false;
  }

  const renderConfig = getRenderConfig(this);

  return renderConfig.renderInternalEntities || !signature.internal;
}

export function privateMemberFilter<Entity extends FunctionLikeEntity | PropertyEntity>(this: MarkupRenderContext, entity: Entity | undefined): boolean {
  if(entity === undefined){
    return false;
  }

  const renderConfig = getRenderConfig(this);

  if(renderConfig.renderPrivateMembers){
    return true;
  }

  if(isFunctionLikeEntity(entity)){
    return entity.signatures.every(signature => !signature.modifiers?.includes("private"));
  }

  return !entity.modifiers?.includes("private");
}

export function privateSignatureFilter(this: MarkupRenderContext, signature: SignatureEntity | undefined): boolean {
  if(signature === undefined){
    return false;
  }

  const renderConfig = getRenderConfig(this);

  return renderConfig.renderPrivateMembers || !signature.modifiers?.includes("private");
}
