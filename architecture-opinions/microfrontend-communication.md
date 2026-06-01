# Microfrontend Communication

## Interview question

How do microfrontends communicate?

If Microfrontend 1 passes `alex={2}` to Microfrontend 2, how does Microfrontend 2 know what to do with it?

## Short answer

Microfrontends communicate through explicit contracts.

Usually, Microfrontend 1 should not directly call Microfrontend 2. Instead, a shell or container app composes the page, loads the microfrontends, and passes data or callbacks according to a public API.

## Common composition models

### 1. Props from the shell

If the shell renders MFE2 as a React component, it can pass props:

<MFE2 alex={2} />

### 2. mount function

some MFEs expose a mount function
mount(domNode, {alex: 2})

### 3. custom event

window.dispatchEvent(new CustomEvent("foo":"bar", {
details: {alex: 2}
}))

less coupled, prone to errors. Ideally should be very well documented and typed.

### 4. shared store

MFEs can use a shared store. This should be used lightly because it can lead to strong coupling.

### 5. BE or url communication

MFEs can communicate through a BE api call or through URL/query params.

### tradeoffs:

props are simple and explicit but require shell ownership of composition.
callbacks are good for child to parent events
custom events are loosly coupled but are less discovarable.
shared stores are convenient but can have hidden coupling.
BE state is good for durable state but has latency.
query params can be manipulated by the user.

a MFE should expose an explicit contract. If the shell renders MFE2 it can pass props and MFE2 will use them correctly because it has exposed publically what props it needs.
for parent-to-child communication using props is the easiest solution and for chld-to-parent using callbacks is the easiest.
for loosly coupled MFEs you can use customEvents, but they need to be well documented.
for global state like a theme or langauge I would use a shared store.
for durable robust state I would communicate through the BE.
MFEs should communicate through explicit public contracts and not through hidden state.
