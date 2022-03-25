import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

import type { TeamsRemoveRoomProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsRemoveRoomProps';

export const teamsRemoveRoomPropsSchema: JSONSchemaType<TeamsRemoveRoomProps> =
  {
    oneOf: [
      {
        type: 'object',
        properties: {
          teamId: {
            type: 'string',
          },
          roomId: {
            type: 'string',
          },
        },
        required: ['teamId', 'roomId'],
        additionalProperties: false,
      },
      {
        type: 'object',
        properties: {
          teamName: {
            type: 'string',
          },
          roomId: {
            type: 'string',
          },
        },
        required: ['teamName', 'roomId'],
        additionalProperties: false,
      },
    ],
  };

export const isTeamsRemoveRoomProps = ajv.compile(teamsRemoveRoomPropsSchema);
