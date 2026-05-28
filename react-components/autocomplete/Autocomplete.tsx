import React, { useState } from "react";

type AutocompleteProps<T> = {
  options: T[];
  getId: (option: T) => string;
  getLabel: (option: T) => string;
  onSelect: (option: T) => void;
  placeholder?: string;
};

export const Autocomplete = <T,>({
  options,
  getId,
  getLabel,
  onSelect,
  placeholder,
}: AutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option: T) => {
    setInputValue(getLabel(option));
    onSelect(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    getLabel(option).toLowerCase().includes(inputValue.toLowerCase()),
  );

  const hasResults = filteredOptions.length > 0;

  return (
    <>
      <h2>autocomplete component</h2>
      <input
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen ? (
        hasResults ? (
          <ul>
            {filteredOptions.map((option) => (
              <li key={getId(option)}>
                <button type="button" onClick={() => handleSelect(option)}>
                  {getLabel(option)}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results</p>
        )
      ) : null}
    </>
  );
};
