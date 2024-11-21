import React, { useState } from 'react';
import { getGames } from '../HttpClient/HttpClient'; // Імпортуємо клієнт

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const games = await getGames([query]); // Викликаємо API для пошуку
      setResults(games);
      setLoading(false);
    } catch (err) {
      setError("Не вдалося знайти ігри");
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
        placeholder="Введіть гру"
      />
      <button onClick={handleSearch}>Шукати</button>

      {loading && <div>Завантаження...</div>}
      {error && <div>{error}</div>}

      <ul>
        {results.map((game) => (
          <li key={game.title}>
            <strong>{game.title}</strong> - {game.salePrice} <br />
            <img src={game.thumb} alt={game.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
