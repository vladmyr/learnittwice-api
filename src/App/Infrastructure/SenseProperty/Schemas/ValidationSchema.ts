import * as Joi from 'joi';

export const ID_SCHEMA = Joi.object().keys({
  id: Joi.number().min(1).max(2147483647).required()
})

export const CREATE_SCHEMA = Joi.object().keys({
  knowledgeUnitId: Joi.number().min(1).max(2147483647).required(),
  propertyRelationId: Joi.number().min(1).max(2147483647).required(),
  senseId: Joi.number().min(1).max(2147483647).required(),
});
  
export const UPDATE_SCHEMA = Joi.object().keys({
  knowledgeUnitId: Joi.number().min(1).max(2147483647).required(),
  propertyRelationId: Joi.number().min(1).max(2147483647).required(),
  senseId: Joi.number().min(1).max(2147483647).required(),
})