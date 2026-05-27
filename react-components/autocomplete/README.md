# Autocomplete

## What the component does

renders an input field
accepts an array of options for filtering
filters the options based on what the user has typed
renders the list of suggested options if the input is not empty
shows an empty state if there are no matches
lets the user select an option
populates the input with the selected option
calls onSelect
hides the list of suggested options after the user chooses one

## Component API

options - an array of options to render
onSelect - the function to call when the user selects an option
placeholder - an optional prop which renders a placeholder for the input

## State design

inputValue - the value to display in the input
isOpen - a boolean which is used to show or hide the suggestions
filteredOptions - a derived data which creates a list of filtered suggestions
filteredOptions is derived from inputValue and options
isOpen is separate from inputValue because after selecting an option the input is not empty but the suggestions list should disappear

## Important implementation decisions

filtering is case insensitive
the dropdown does not show before the user starts typing
selecting an option closes the suggestions

## Tests covered

render with placeholder
do not show suggestions before typing
show matching suggestions when the user types
filter case insensitive
show no results when there are no matches
set input value to the selected suggestion
hide the dropdown after selecting an option

## Future improvements

use debounce
close dropdown after outside click
add a11y
highlight matching text
support error state
make component generic
support debounced remote search
add styling
