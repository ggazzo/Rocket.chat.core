export type TeamsDeleteProps = ({ teamId: string } | { teamName: string }) & {
  roomsToRemove?: string[];
};
