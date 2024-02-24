import React, { useState, useEffect, useCallback } from 'react';

type AutoCompleteInputProps = {
  dataSet: string[];
  onSuggestionSelect: (value: string) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactElement;
  inputClassName?: string;
  suggestionsClassName?: string;
  placementClassName?: string;
};

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({   
  dataSet, 
  onSuggestionSelect, 
  onInputChange,
  children,
  inputClassName,
  suggestionsClassName,
  placementClassName
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) {
        onInputChange(e);
      }
    const value = e.target.value;
    const filteredSuggestions = value ? dataSet.filter(type => type.toLowerCase().includes(value.toLowerCase())) : [];
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  }, [dataSet]);

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false);
  };

  // Clone the input element to add props
  const inputElement = React.cloneElement(children, {
    onChange: handleChange,
    onFocus: () => setShowSuggestions(true),
    onBlur: () => setTimeout(() => setShowSuggestions(false), 1000),
    className: inputClassName,
  });

  return (
    <>
    <div className={`${placementClassName}`} >
      {inputElement}
      {showSuggestions && suggestions.length > 0 && (
        <ul className={`fixed z-10 bg-white w-42 rounded mt-0 p-0 ${suggestionsClassName}`}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-100"
              role="option"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      </div>
    </>
  );
};

export default AutoCompleteInput;
