// src/components/Loader/Loader.jsx
import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="dots-container">
      <div className="dot"></div>
      <div className="dot"></div>
  <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

export default Loader;