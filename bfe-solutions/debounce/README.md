# Debounce

Debounce delays the calling of a function with a defined delay.

I create the function, in it I create a timer. The outer function returns a new function. The returned function is what the caller uses. Each call clears the previous timer and starts a new one. It clears the previous timer and assigns to the timer a delayed function with the args which were passed from outside using setTimeout.

common use cases:

- search input
- autocomplete
- resize listener
- scroll listener

# Follow-up improvement

The first version did not preserve 'this'. A more complete implementation should use fn.apply(this, args)
