import {
  CloudRegistrationIntentData,
  CloudConfirmationPollData,
} from '@rocket.chat.core/core-typings';

export type CloudEndpoints = {
  '/api/v1/cloud.manualRegister': {
    POST: (params: { cloudBlob: string }) => void;
  };
  '/api/v1/cloud.createRegistrationIntent': {
    POST: (params: { resend: boolean; email: string }) => {
      intentData: CloudRegistrationIntentData;
    };
  };
  '/api/v1/cloud.confirmationPoll': {
    GET: (params: { deviceCode: string; resend?: boolean }) => {
      pollData: CloudConfirmationPollData;
    };
  };
};
