import Ajv, { JSONSchemaType } from 'ajv';

import { PermissionsUpdateProps } from '@rocket.chat.core/rest-typings/src/v1/permissions';

const ajv = new Ajv();

const permissionUpdatePropsSchema: JSONSchemaType<PermissionsUpdateProps> = {
  type: 'object',
  properties: {
    permissions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          roles: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
        required: ['_id', 'roles'],
      },
    },
  },
  required: ['permissions'],
  additionalProperties: false,
};

export const isBodyParamsValidPermissionUpdate = ajv.compile(
  permissionUpdatePropsSchema
);
