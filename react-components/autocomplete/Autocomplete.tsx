import React, { useState } from "react";

type AutocompleteOption = {
  id: string;
  label: string;
};

type AutocompleteProps = {
  options: AutocompleteOption[];
  onSelect: (option: AutocompleteOption) => void;
  placeholder?: string;
};

export const Autocomplete = ({
  options,
  onSelect,
  placeholder,
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (option: AutocompleteOption) => {
    setInputValue(option.label);
    onSelect(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
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
              <li key={option.id}>
                <button type="button" onClick={() => handleSelect(option)}>
                  {option.label}
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
