import React, { useState } from 'react';
import './search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    fetchResults(query)
  };

  const fetchResults = (query) => {
    fetch(`http://localhost:5000/search?query=${query}`)
    .then(res => res.json())
    .then(data => setResults(data))
    .catch(error => console.error('Error fetching search results', error))
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchResults(query);
    }
  };

  return (
    <div className="search-container">
      {/* <h1>Search</h1> */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder='Search...'
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
