import { IRole } from '@rocket.chat.core/core-typings';

export type TeamsUpdateMemberProps = (
  | { teamId: string }
  | { teamName: string }
) & {
  member: {
    userId: string;
    roles?: Array<IRole['_id']> | null;
  };
};
