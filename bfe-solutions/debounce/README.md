# Debounce

Debounce delays the calling of a function with a defined delay.

I create the function, in it I create a timer. I return a function gets called by the actual client with some args. It clears the previous timer and assigns to the timer a delayed function with the args which were passed from outside using setTimeout.

common use cases:

- search input
- autocomplete
- resize listener
- scroll listener
