export type TeamsRemoveMemberProps = (
  | { teamId: string }
  | { teamName: string }
) & {
  userId: string;
  rooms?: Array<string>;
};
