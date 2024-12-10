import React, { useState } from 'react';

const SearchInputWithButton = React.memo(({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  }

  console.log('SearchInputWithButton rendered');

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Введіть назву гри"
      />
      <button onClick={handleSearchClick}>Шукати</button>
    </div>
  );
});

export default SearchInputWithButton;
