import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

import type { TeamsConvertToChannelProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsConvertToChannelProps';

const teamsConvertToTeamsPropsSchema: JSONSchemaType<TeamsConvertToChannelProps> =
  {
    oneOf: [
      {
        type: 'object',

        properties: {
          roomsToRemove: {
            type: 'array',
            items: {
              type: 'string',
            },
            nullable: true,
          },
          teamId: {
            type: 'string',
          },
        },
        required: ['teamId'],
        additionalProperties: false,
      },
      {
        type: 'object',
        properties: {
          roomsToRemove: {
            type: 'array',
            items: {
              type: 'string',
            },
            nullable: true,
          },
          teamName: {
            type: 'string',
          },
        },
        required: ['teamName'],
        additionalProperties: false,
      },
    ],
  };

export const isTeamsConvertToChannelProps = ajv.compile(
  teamsConvertToTeamsPropsSchema
);
