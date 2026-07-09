import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ActivityFeed } from "./ActivityFeed";
import type { FeedItem } from "./types";

const MOCK: FeedItem[] = [
  {
    id: "1",
    headline: "Your order has shipped",
    summary: "Track package #48291",
    kind: "organic",
  },
  {
    id: "2",
    headline: "Summer sale — 30% off",
    summary: "Limited time on selected brands",
    kind: "promo",
  },
];

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("ActivityFeed", () => {
  it("shows a loading state while the fetch is pending", () => {
    const d = deferred<FeedItem[]>();
    render(
      <ActivityFeed userId="u1" fetchActivityFeed={() => d.promise} />,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders feed items once loaded", async () => {
    render(
      <ActivityFeed userId="u1" fetchActivityFeed={async () => MOCK} />,
    );

    expect(await screen.findByText("Your order has shipped")).toBeInTheDocument();
    expect(screen.getByText("Track package #48291")).toBeInTheDocument();
    expect(screen.getByText("Summer sale — 30% off")).toBeInTheDocument();
    expect(screen.getByText("Limited time on selected brands")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("marks promo items with a Promoted badge", async () => {
    render(
      <ActivityFeed userId="u1" fetchActivityFeed={async () => MOCK} />,
    );

    await screen.findByText("Summer sale — 30% off");

    const promoItem = screen.getByText("Summer sale — 30% off").closest("li");
    expect(promoItem).not.toBeNull();
    expect(promoItem).toHaveTextContent(/promoted/i);

    const organicItem = screen
      .getByText("Your order has shipped")
      .closest("li");
    expect(organicItem).not.toBeNull();
    expect(organicItem).not.toHaveTextContent(/promoted/i);
  });

  it("shows an empty state when the feed is empty", async () => {
    render(
      <ActivityFeed userId="u1" fetchActivityFeed={async () => []} />,
    );
    expect(await screen.findByText(/nothing in your feed/i)).toBeInTheDocument();
  });

  it("shows an error state (and does not throw) when the fetch fails", async () => {
    render(
      <ActivityFeed
        userId="u1"
        fetchActivityFeed={async () => {
          throw new Error("network down");
        }}
      />,
    );
    expect(
      await screen.findByText(/couldn't load activity feed/i),
    ).toBeInTheDocument();
  });

  it("calls onItemClick with the item when a headline is clicked", async () => {
    const onItemClick = vi.fn();
    const user = userEvent.setup();
    render(
      <ActivityFeed
        userId="u1"
        fetchActivityFeed={async () => MOCK}
        onItemClick={onItemClick}
      />,
    );

    await user.click(await screen.findByText("Your order has shipped"));
    expect(onItemClick).toHaveBeenCalledWith(MOCK[0]);
  });
});
