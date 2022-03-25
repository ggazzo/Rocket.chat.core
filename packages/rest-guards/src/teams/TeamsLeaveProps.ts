import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

import type { TeamsLeaveProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsLeaveProps';

const teamsLeavePropsSchema: JSONSchemaType<TeamsLeaveProps> = {
  oneOf: [
    {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
        },
        rooms: {
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
        rooms: {
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

export const isTeamsLeaveProps = ajv.compile(teamsLeavePropsSchema);
