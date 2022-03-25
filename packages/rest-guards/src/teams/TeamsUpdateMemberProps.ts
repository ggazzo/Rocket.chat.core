import Ajv, { JSONSchemaType } from 'ajv';

import type { TeamsUpdateMemberProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsUpdateMemberProps';

const ajv = new Ajv();

const teamsUpdateMemberPropsSchema: JSONSchemaType<TeamsUpdateMemberProps> = {
  oneOf: [
    {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
        },
        member: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
            },
            roles: {
              type: 'array',
              items: {
                type: 'string',
              },
              nullable: true,
            },
          },
          required: ['userId'],
          additionalProperties: false,
        },
      },
      required: ['teamId', 'member'],
      additionalProperties: false,
    },
    {
      type: 'object',
      properties: {
        teamName: {
          type: 'string',
        },
        member: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
            },
            roles: {
              type: 'array',
              items: {
                type: 'string',
              },
              nullable: true,
            },
          },
          required: ['userId'],
          additionalProperties: false,
        },
      },
      required: ['teamName', 'member'],
      additionalProperties: false,
    },
  ],
};

export const isTeamsUpdateMemberProps = ajv.compile(
  teamsUpdateMemberPropsSchema
);
