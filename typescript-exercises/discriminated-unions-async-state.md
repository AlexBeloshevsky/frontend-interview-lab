# Discriminated Unions: Async State

## Problem

Frontend components often need to represent async states:

- idle
- loading
- success
- error

A common approach is to use multiple separate values:

```ts
type BadAsyncState<T> = {
  isLoading: boolean;
  data: T | null;
  error: string | null;
};
```

The problem is that this allows impossible states, for example:

```ts
const state: BadAsyncState<string[]> = {
  isLoading: true,
  data: ["React"],
  error: "Request failed",
};
```

This says the request is loading, succeeded, and failed at the same time.

## Better approach

Use a discriminated union:

```ts
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
```

Now each state has only the fields that make sense for that status.

## Example usage

```ts
type User = {
  id: string;
  name: string;
};

type UsersState = AsyncState<User[]>;
```

Examples:

```ts
const idleState: UsersState = {
  status: "idle",
};

const loadingState: UsersState = {
  status: "loading",
};

const successState: UsersState = {
  status: "success",
  data: [{ id: "1", name: "Alex" }],
};

const errorState: UsersState = {
  status: "error",
  error: "Failed to load users",
};
```

## Render function example

```ts
function getMessage<T>(state: AsyncState<T[]>): string {
  switch (state.status) {
    case "idle":
      return "Nothing loaded yet";

    case "loading":
      return "Loading...";

    case "success":
      return `Loaded ${state.data.length} items`;

    case "error":
      return state.error;
  }
}
```

## Why this helps

Inside each `case`, TypeScript narrows the type.

For example, inside:

```ts
case "success":
```

TypeScript knows that `state` has a `data` field.

Inside:

```ts
case "error":
```

TypeScript knows that `state` has an `error` field.

## Interview answer

I prefer modeling async UI state with a discriminated union when the states are mutually exclusive.

Instead of tracking `isLoading`, `data`, and `error` independently, I model the actual states the UI can be in: `idle`, `loading`, `success`, and `error`.

This prevents impossible combinations like loading and error at the same time. It also makes rendering clearer because the component can switch on `state.status`, and TypeScript narrows the available fields in each branch.

For small components, booleans may be fine. But when async state becomes more complex, a discriminated union gives better correctness and readability.
