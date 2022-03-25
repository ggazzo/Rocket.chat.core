import type { IRoom } from '@rocket.chat.core/core-typings';

export type TeamsRemoveRoomProps = (
  | { teamId: string }
  | { teamName: string }
) & {
  roomId: IRoom['_id'];
};
