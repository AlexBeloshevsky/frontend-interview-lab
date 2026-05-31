# Promise.all

## What it does

`promiseAll` accepts an array of plain values and/or promises and returns a promise.

The returned promise:

- resolves when all items resolve
- resolves with the results in the same order as the input
- rejects if any item rejects
- supports plain values as well as promises
- resolves to an empty array when given an empty array
