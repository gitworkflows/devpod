import Analytics from 'analytics-node'; // replace with your actual import
const analytics = new Analytics('YOUR_WRITE_KEY'); // replace with your actual Segment write key
import { v4 as uuidv4 } from 'uuid'; // for generating fallback anonymousId

type AnalyticsMsg = {
  messageId?: string;
  userId?: string | number;
  anonymousId?: string | number;
  subjectId?: string;
  traits?: any;
  timestamp?: Date;
  context?: any;
  event?: string;
  category?: string;
  name?: string;
  properties?: any;
};

function ensureAnonymousId(msg: AnalyticsMsg): string | number {
  return msg.anonymousId ?? uuidv4(); // fallback to a UUID
}

export function trackIdentify(msg: AnalyticsMsg) {
  analytics.identify({
    ...msg,
    anonymousId: ensureAnonymousId(msg),
    integrations: {
      All: true,
      Mixpanel: false,
    },
  });
}

export function trackEvent(msg: AnalyticsMsg) {
  if (!msg.event) throw new Error("Missing event name");
  analytics.track({
    ...(msg as AnalyticsMsg & { event: string }),
    anonymousId: ensureAnonymousId(msg),
    integrations: {
      All: true,
      Mixpanel: false,
    },
  });
}

export function trackScreen(msg: AnalyticsMsg) {
  analytics.page({
    ...msg,
    anonymousId: ensureAnonymousId(msg),
    integrations: {
      All: true,
      Mixpanel: false,
    },
  });
}
