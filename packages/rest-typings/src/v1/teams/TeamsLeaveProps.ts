export type TeamsLeaveProps = ({ teamId: string } | { teamName: string }) & {
  rooms?: string[];
};
