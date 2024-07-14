// search.js

import React, { useState } from 'react';
import './search.css';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder='Search...'
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
}

export default Search;
