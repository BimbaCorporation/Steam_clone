import React, { useCallback, useState } from 'react';
import { searchGamesByTitle } from '../../HttpClient/cheapshark';
import '../../styles/Search.css';
import ResultsTable from './features/ResultsTable';
import SearchInputWithButton from './features/SearchInputWithButton';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Мемоізовані функції для обробки пошуку
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const games = await searchGamesByTitle(query);
      setResults(games);
    } catch (err) {
      setError('Не вдалося знайти ігри');
    } finally {
      setLoading(false);
    }
  }, []);

  console.log('Search rendered');

  return (
    <div>
      <h1>Пошук ігор</h1>
      <SearchInputWithButton onSearch={handleSearch} />
      
      {loading && <div>Завантаження...</div>}
      {error && <div>{error}</div>}
      {results.length > 0 && <ResultsTable results={results} />}
    </div>
  );
};

export default Search;
