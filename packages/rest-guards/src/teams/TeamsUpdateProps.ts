import Ajv, { JSONSchemaType } from 'ajv';

import type { TeamsUpdateProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsUpdateProps';
import { TEAM_TYPE } from '@rocket.chat.core/core-typings';

const ajv = new Ajv();

const teamsUpdatePropsSchema: JSONSchemaType<TeamsUpdateProps> = {
  type: 'object',
  properties: {
    updateRoom: {
      type: 'boolean',
      nullable: true,
    },
    teamId: {
      type: 'string',
      nullable: true,
    },
    teamName: {
      type: 'string',
      nullable: true,
    },
    data: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          nullable: true,
        },
        type: {
          type: 'number',
          enum: [TEAM_TYPE.PUBLIC, TEAM_TYPE.PRIVATE],
        },
      },
      additionalProperties: false,
      required: [],
      anyOf: [
        {
          required: ['name'],
        },
        {
          required: ['type'],
        },
      ],
    },
    name: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
  oneOf: [
    {
      required: ['teamId', 'data'],
    },
    {
      required: ['teamName', 'data'],
    },
  ],
  additionalProperties: false,
};

export const isTeamsUpdateProps = ajv.compile(teamsUpdatePropsSchema);
