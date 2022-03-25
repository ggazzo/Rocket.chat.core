export type TeamsConvertToChannelProps = {
  roomsToRemove?: string[];
} & ({ teamId: string } | { teamName: string });
