// Design your feed data model here.
// Tests require: export a `FeedItem` type (see TASK.md for suggested shape).

export type FeedItemKind = "organic" | "promo";

export interface FeedItem {
  id: string;
  headline: string;
  summary: string;
  kind: FeedItemKind;
}

export type FetchActivityFeed = (userId: string) => Promise<FeedItem[]>;
