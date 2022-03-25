import { TEAM_TYPE } from '@rocket.chat.core/core-typings';

export type TeamsUpdateProps = ({ teamId: string } | { teamName: string }) & {
  data:
    | {
        name: string;
        type?: TEAM_TYPE;
      }
    | {
        name?: string;
        type: TEAM_TYPE;
      };
};
