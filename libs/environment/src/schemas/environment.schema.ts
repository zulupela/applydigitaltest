import { default as joi } from 'joi';

export const environmentSchema = joi.object({
  CORE_API_PORT: joi.number().required(),
  CORE_CRON_PORT: joi.number().required()
});
