import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

import type { TeamsDeleteProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsDeleteProps';

const teamsDeletePropsSchema: JSONSchemaType<TeamsDeleteProps> = {
  oneOf: [
    {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
        },
        roomsToRemove: {
          type: 'array',
          items: {
            type: 'string',
          },
          minItems: 1,
          uniqueItems: true,
          nullable: true,
        },
      },
      required: ['teamId'],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: {
        teamName: {
          type: 'string',
        },
        roomsToRemove: {
          type: 'array',
          items: {
            type: 'string',
          },
          minItems: 1,
          uniqueItems: true,
          nullable: true,
        },
      },
      required: ['teamName'],
      additionalProperties: false,
    },
  ],
};

export const isTeamsDeleteProps = ajv.compile(teamsDeletePropsSchema);
