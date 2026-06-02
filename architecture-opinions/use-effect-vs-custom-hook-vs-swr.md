# useEffect vs Custom Hook vs SWR for BE api calls

## The problem

In React apps, components often need server data.

There are several ways to fetch and manage that data:

- fetch directly inside `useEffect`
- extract the logic into a custom hook
- use a server-state library like SWR or TanStack Query

The right choice depends on complexity, reuse, caching needs, and how important consistency is.

## Option 1: Fetch inside useEffect

### When it is okay

Fetching directly inside `useEffect` can be okay for:

- a very small demo
- one-off data loading
- simple internal tools
- code that will not be reused

Example:

```tsx
useEffect(() => {
  async function loadData() {
    const response = await fetch("/api/items");
    const data = await response.json();
    setItems(data);
  }

  loadData();
}, []);
```

Problems:
the component needs to manually handle:

- loading states
- error states
- race conditions
- cancellations
- retries
- caching
- stale data
- duplicated requests

I would avoid this unless its a specific usecase of an internal tool in which speed is of much greater importance than resuability or code quality

## Option 2: Custom Hook

### When I would use it

I would use this in a case in which the logic blongs to the domain and I want to reuse it, for example an api call to get the fees for the user.

Example:

```tsx
const { fees } = useFees(userId);
```

this keeps the component clean and give us a chance to use a facade design pattern.

benefits:

- keeps logic separate
- improves reuse
- easier to test

problems:
still has to solve caching, retries, loading, deduping internally.

## Option 3: SWR

### When I would use it

I would use SWR when I need a light server-side state abstraction. benefits:
-caching
-stale state invalidation
-request deduping
-revalidation
-simple API

good usecases:
-profiles
-settings pages
-dashboards
-readonly screens

why this is better than options 1 and 2 - provides out-of-the-box solution to problems I don't want to solve over and over again like deduping and stale-state.

### my default opinion

use useEffect for one-off use-cases in internal tools.
use custom hooks in simple domain specific use-cases like fees or cutoff times.
use SWR when you need a light-weight backend state abstratction with caching, revalidation, deduping, state-state, etc.

## Connection to autocomplete

The current autocomplete component filters local data.

A future remote-search version would probably use:

- debounced input
- a custom `useSearchSuggestions` hook
- SWR or TanStack Query for fetching and caching suggestions

The evolution could be:

1. local filtering
2. debounced local filtering
3. debounced remote search
4. SWR/TanStack Query version
