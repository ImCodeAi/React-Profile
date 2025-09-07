// src/components/SearchBox/SearchBox.jsx
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
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

  // تابع برای پاک کردن محتوا
  const handleClear = () => {
    setInputValue('');
    setQuery('');
  };

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
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <IconButton
              aria-label="پاک کردن جستجو"
              onClick={handleClear}
              edge="end"
              size="small"
              sx={{
                padding: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(11, 94, 215, 0.1)'
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      className="search-box"
    />
  );
};

export default SearchBox;