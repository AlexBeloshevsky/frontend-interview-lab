import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FilterableList } from "./FilterableList";

describe("FilterableList", () => {
  it("renders all items initially", () => {
    render(<FilterableList items={["Apple", "Banana", "Cherry"]} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  it("filters case-insensitively as the user types", async () => {
    const user = userEvent.setup();
    render(<FilterableList items={["Apple", "Banana", "Cherry"]} />);

    await user.type(screen.getByRole("textbox"), "an");

    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<FilterableList items={["Apple", "Banana"]} />);

    await user.type(screen.getByRole("textbox"), "zzz");

    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
