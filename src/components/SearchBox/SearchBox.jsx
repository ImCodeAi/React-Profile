// src/components/SearchBox/SearchBox.jsx
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import "./SearchBox.css";

const SearchBox = ({ query, setQuery }) => {
  const [inputValue, setInputValue] = useState(query);

  // Debounce effect - اضافه کردن تاخیر 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setQuery]);

  return (
    <TextField
      label="جستجو در پست‌ها..."
      variant="outlined"
      size="small"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      className="search-box"
    />
  );
};

export default SearchBox;