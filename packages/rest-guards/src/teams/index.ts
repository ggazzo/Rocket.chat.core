import type { TeamsAddMembersProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsAddMembersProps';
import type { TeamsConvertToChannelProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsConvertToChannelProps';
import type { TeamsDeleteProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsDeleteProps';
import type { TeamsLeaveProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsLeaveProps';
import type { TeamsRemoveMemberProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsRemoveMemberProps';
import type { TeamsRemoveRoomProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsRemoveRoomProps';
import type { TeamsUpdateMemberProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsUpdateMemberProps';
import type { TeamsUpdateProps } from '@rocket.chat.core/rest-typings/src/v1/teams/TeamsUpdateProps';

type TeamProps =
  | TeamsRemoveRoomProps
  | TeamsConvertToChannelProps
  | TeamsUpdateMemberProps
  | TeamsAddMembersProps
  | TeamsRemoveMemberProps
  | TeamsDeleteProps
  | TeamsLeaveProps
  | TeamsUpdateProps;

export const isTeamPropsWithTeamName = <T extends TeamProps>(
  props: T
): props is T & { teamName: string } => 'teamName' in props;

export const isTeamPropsWithTeamId = <T extends TeamProps>(
  props: T
): props is T & { teamId: string } => 'teamId' in props;
