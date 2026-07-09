import type { FeedItem, FetchActivityFeed } from "./types";

export interface ActivityFeedProps {
  userId: string;
  fetchActivityFeed?: FetchActivityFeed;
  onItemClick?: (item: FeedItem) => void;
}

/**
 * Iteration 1: implement everything here — fetch, state, and UI.
 * Iteration 2: extract data logic to hooks/useActivityFeed.ts
 */
export function ActivityFeed(_props: ActivityFeedProps) {
  return null;
}
