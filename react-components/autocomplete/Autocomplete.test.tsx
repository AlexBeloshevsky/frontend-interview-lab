import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Autocomplete } from "./Autocomplete";

const options = [
  { id: "1", label: "React" },
  { id: "2", label: "TypeScript" },
  { id: "3", label: "JavaScript" },
  { id: "4", label: "SWR" },
];

describe("Autocomplete", () => {
  it("renders the input with the provided placeholder", () => {
    render(
      <Autocomplete
        options={options}
        getId={(option) => option.id}
        getLabel={(option) => option.label}
        onSelect={vi.fn()}
        placeholder="Search topics"
      />,
    );

    expect(screen.getByPlaceholderText("Search topics")).toBeInTheDocument();
  });

  it("does not show options before the user types", () => {
    render(
      <Autocomplete
        options={options}
        getId={(option) => option.id}
        getLabel={(option) => option.label}
        onSelect={vi.fn()}
        placeholder="Search topics"
      />,
    );

    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
  });

  it("shows matching options when the user types", async () => {
    const user = userEvent.setup();

    render(
      <Autocomplete
        options={options}
        getId={(option) => option.id}
        getLabel={(option) => option.label}
        onSelect={vi.fn()}
        placeholder="Search topics"
      />,
    );

    await user.type(screen.getByPlaceholderText("Search topics"), "re");

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
  });

  it("filters options case-insensitively", async () => {
    const user = userEvent.setup();

    render(
      <Autocomplete
        options={options}
        getId={(option) => option.id}
        getLabel={(option) => option.label}
        onSelect={vi.fn()}
        placeholder="Search topics"
      />,
    );

    await user.type(screen.getByPlaceholderText("Search topics"), "react");

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("shows a no results message when nothing matches", async () => {
    const user = userEvent.setup();

    render(
      <Autocomplete
        options={options}
        getId={(option) => option.id}
        getLabel={(option) => option.label}
        onSelect={vi.fn()}
        placeholder="Search topics"
      />,
    );

    await user.type(screen.getByPlaceholderText("Search topics"), "python");

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("calls onSelect when the user selects an option", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Autocomplete
        options={options}
        getId={(option) => option.id}
        getLabel={(option) => option.label}
        onSelect={onSelect}
        placeholder="Search topics"
      />,
    );

    await user.type(screen.getByPlaceholderText("Search topics"), "rea");
    await user.click(screen.getByRole("button", { name: "React" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith({ id: "1", label: "React" });
  });

  it("sets the input value to the selected option label", async () => {
    const user = userEvent.setup();

    render(
      <Autocomplete
        options={options}
        getId={(option) => option.id}
        getLabel={(option) => option.label}
        onSelect={vi.fn()}
        placeholder="Search topics"
      />,
    );

    const input = screen.getByPlaceholderText("Search topics");

    await user.type(input, "rea");
    await user.click(screen.getByRole("button", { name: "React" }));

    expect(input).toHaveValue("React");
  });

  it("hides the dropdown after selecting an option", async () => {
    const user = userEvent.setup();

    render(
      <Autocomplete
        options={options}
        getId={(option) => option.id}
        getLabel={(option) => option.label}
        onSelect={vi.fn()}
        placeholder="Search topics"
      />,
    );

    await user.type(screen.getByPlaceholderText("Search topics"), "rea");
    await user.click(screen.getByRole("button", { name: "React" }));

    expect(
      screen.queryByRole("button", { name: "React" }),
    ).not.toBeInTheDocument();
  });
});
