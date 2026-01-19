import { persistentAtom } from "@nanostores/persistent";
import type { TimePeriod } from "@/stores/types";

/**
 * Persistent store for selected time period
 * Syncs with localStorage to remember user's selection
 */
export const $selectedPeriod = persistentAtom<TimePeriod>(
    "analytics-period",
    "6-months",
);
