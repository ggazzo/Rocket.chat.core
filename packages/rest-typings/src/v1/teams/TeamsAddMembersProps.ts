import { IRole } from '@rocket.chat.core/core-typings';

export type TeamsAddMembersProps = (
  | { teamId: string }
  | { teamName: string }
) & {
  members: {
    userId: string;
    roles?: Array<IRole['_id']> | null;
  }[];
};
