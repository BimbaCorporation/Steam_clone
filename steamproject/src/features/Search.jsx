import React, { useState } from 'react';
import { searchGamesByTitle } from '../HttpClient/HttpClient';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const games = await searchGamesByTitle(query);
      setResults(games);
    } catch (err) {
      setError("Не вдалося знайти ігри");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Пошук ігор</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введіть назву гри"
      />
      <button onClick={handleSearch}>Шукати</button>

      {loading && <div>Завантаження...</div>}
      {error && <div>{error}</div>}

      <ul>
        {results.map((game) => (
          <li key={game.dealID}>
            <strong>{game.title}</strong> - ${game.price} (знижка: {Math.round(game.savings)}%) <br />
            <img src={game.thumb} alt={game.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
