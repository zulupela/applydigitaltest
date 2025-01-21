import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiDynamicFilterSortAndPagination<T>(fixedProperty: keyof T) {
  return applyDecorators(
    ApiQuery({
      name: `filter[${String(fixedProperty)}]`,
      required: false,
      description: `
      Dynamic filter in the format filter[property][op]=value. 
      Replace "property" with the field name (e.g., "brand") and "op" with the operator (e.g., "eq").

      Currently, Swagger is limited to deepObject with just one level of nested properties.
      As a result, this documentation is limited to filtering by the ${String(fixedProperty)} property.

      To fully utilize the filtering capabilities, please use the Postman collection.
      `,
      style: 'deepObject',
      schema: {
        type: 'object',
        additionalProperties: {
          type: 'object',
          additionalProperties: {
            type: 'string',
            example: 'Apple'
          }
        },
        example: {
          eq: 'Apple'
        }
      }
    }),
    ApiQuery({
      name: `sort`,
      required: false,
      description: `Dynamic sorting in the format sort[property]=value.`,
      style: 'deepObject',
      schema: {
        type: 'object',
        additionalProperties: {
          type: 'string'
        },
        example: {
          stock: 'asc',
          price: 'asc'
        }
      }
    }),
    ApiQuery({
      name: `pagination`,
      required: false,
      description: `Dynamic pagination in the format pagination[offset]=value and pagination[limit]=value.`,
      style: 'deepObject',
      schema: {
        type: 'object',
        additionalProperties: {
          type: 'number'
        },
        example: {
          offset: 0,
          limit: 5
        }
      }
    })
  );
}
