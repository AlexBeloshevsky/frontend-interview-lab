/**
 * Warm-up 03 — FilterableList
 *
 * Render items with a search box that filters them (case-insensitive substring),
 * with an empty state. See TASK.md. Stub renders only the input for now.
 */

export interface FilterableListProps {
  items: string[];
  placeholder?: string;
}

export function FilterableList({ items, placeholder }: FilterableListProps) {
  // TODO: implement (see TASK.md)
  // - hold the query in state
  // - derive the filtered list during render
  // - render the input, then the list or an empty state
  return (
    <div>
      <input type="text" placeholder={placeholder} aria-label="Filter" />
    </div>
  );
}
