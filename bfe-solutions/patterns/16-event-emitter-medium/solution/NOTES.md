# 16. Event Emitter — the idea

**Plain-English approach:**

> Keep a map of `eventName -> collection of listeners`. `subscribe` adds a listener
> and returns an object with `release()` that removes *that specific* listener.
> `emit` looks up the listeners for the event and calls each with the relayed args.

## The subtle requirement

> "the same callback could subscribe on the same event multiple times"

If you store raw callbacks and remove with `indexOf`, releasing one subscription
can't tell duplicates apart. **Fix:** wrap each subscription in a unique *holder*
object (`{ callback }`). `release()` closes over its own holder and deletes exactly
that one — duplicates are independent.

## Key primitives

- `Map<string, Set<holder>>` — listeners grouped by event.
- **Closures** — `release()` captures the specific holder + the set.
- **Snapshot on emit** (`[...holders]`) — so a listener that releases itself (or
  others) mid-emit doesn't corrupt the iteration.

## Watch out

- `emit` on an unknown event should be a no-op, not a throw.
- Args must be relayed: `emit('e', 1, 2)` → `callback(1, 2)`.
- `release()` twice should be safe (deleting an absent holder is a no-op).
