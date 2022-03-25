import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

import type { TeamsRemoveMemberProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsRemoveMemberProps';

const teamsRemoveMemberPropsSchema: JSONSchemaType<TeamsRemoveMemberProps> = {
  oneOf: [
    {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
        },
        userId: {
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
      required: ['teamId', 'userId'],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: {
        teamName: {
          type: 'string',
        },
        userId: {
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
      required: ['teamName', 'userId'],
      additionalProperties: false,
    },
  ],
};

export const isTeamsRemoveMemberProps = ajv.compile(
  teamsRemoveMemberPropsSchema
);
