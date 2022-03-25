import type { IStats } from '@rocket.chat.core/core-typings';

export type StatisticsEndpoints = {
  '/api/v1/statistics': {
    GET: (params: { refresh?: boolean }) => IStats;
  };
  '/api/v1/statistics.telemetry': {
    POST: (params: TelemetryPayload) => unknown;
  };
};

export type TelemetryBase = {
  eventName: string;
  timestamp: number;
};

type OTREnded = TelemetryBase & { rid: string };

type SlashCommand = TelemetryBase & { command: string };

export type StatsCounter = TelemetryBase & { settingsId: string };

type Params = TelemetryBase | OTREnded | SlashCommand | StatsCounter;

export type TelemetryPayload = { params: Params[] };
