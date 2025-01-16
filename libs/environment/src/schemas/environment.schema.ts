import { default as joi } from 'joi';

export const environmentSchema = joi.object({
  CORE_API_PORT: joi.number().required(),
  CORE_CRON_PORT: joi.number().required(),

  DATABASE_HOST: joi.string().required(),
  DATABASE_PORT: joi.number().required(),
  DATABASE_NAME: joi.string().required(),
  DATABASE_USER: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_MIGRATIONS_RUN: joi.boolean().required()
});
