import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RecommendationsWidget } from "./RecommendationsWidget";
import type { Product } from "./types";

const MOCK: Product[] = [
  { id: "1", title: "Wireless Headphones", price: 199, image: "https://img/1.jpg" },
  { id: "2", title: "Mechanical Keyboard", price: 89, image: "https://img/2.jpg" },
];

/** A promise you can resolve/reject by hand — lets you observe the loading state. */
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("RecommendationsWidget", () => {
  it("shows a loading state while the fetch is pending", () => {
    const d = deferred<Product[]>();
    render(
      <RecommendationsWidget userId="u1" fetchRecommendations={() => d.promise} />,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders the recommendations once loaded", async () => {
    render(
      <RecommendationsWidget userId="u1" fetchRecommendations={async () => MOCK} />,
    );

    expect(await screen.findByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("shows an empty state when there are no recommendations", async () => {
    render(
      <RecommendationsWidget userId="u1" fetchRecommendations={async () => []} />,
    );
    expect(await screen.findByText(/no recommendations/i)).toBeInTheDocument();
  });

  it("shows an error state (and does not throw) when the fetch fails", async () => {
    render(
      <RecommendationsWidget
        userId="u1"
        fetchRecommendations={async () => {
          throw new Error("network down");
        }}
      />,
    );
    expect(
      await screen.findByText(/couldn't load recommendations/i),
    ).toBeInTheDocument();
  });

  it("calls onSelect with the recommendation when an item is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <RecommendationsWidget
        userId="u1"
        fetchRecommendations={async () => MOCK}
        onSelect={onSelect}
      />,
    );

    await user.click(await screen.findByText("Wireless Headphones"));
    expect(onSelect).toHaveBeenCalledWith(MOCK[0]);
  });
});
