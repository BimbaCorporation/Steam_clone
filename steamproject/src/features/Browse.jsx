import React, { useState, useEffect } from "react";
import { getDeals } from "../HttpClient/HttpClient";
import "../styles/Browse.css";

const Browse = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filters, setFilters] = useState({
    AAA: 0,
    steamworks: 0,
    onSale: 0,
    title: "",
    priceRange: [0, 50],
    hideDuplicates: false,
    steamRating: 70,
  });

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      setError(null);

      try {
        // Формуємо фільтри для API
        const apiFilters = {
          AAA: filters.AAA,
          steamworks: filters.steamworks,
          onSale: filters.onSale,
          steamRating: filters.steamRating,
          upperPrice: filters.priceRange[1],
          lowerPrice: filters.priceRange[0],
        };

        const data = await getDeals(apiFilters);
        setDeals(data);
        setLoading(false);
      } catch (error) {
        setError("Не вдалося завантажити пропозиції.");
        setLoading(false);
      }
    };

    fetchDeals();
  }, [filters]);

  useEffect(() => {
    // Локальне фільтрування
    let filtered = [...deals];

    if (filters.title) {
      filtered = filtered.filter((deal) =>
        deal.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.hideDuplicates) {
      const uniqueTitles = new Set();
      filtered = filtered.filter((deal) => {
        if (uniqueTitles.has(deal.title)) return false;
        uniqueTitles.add(deal.title);
        return true;
      });
    }

    setFilteredDeals(filtered);
  }, [filters, deals]);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";

    const sorted = [...filteredDeals].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredDeals(sorted);
  };

  if (loading) return <div className="loading">Завантаження...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="browse-container">
      <h1>Вигідні пропозиції</h1>

      {/* Фільтри */}
      <div className="filters">
        <input
          type="text"
          placeholder="Назва гри"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <div>
          <label>Діапазон ціни:</label>
          <input
            type="number"
            value={filters.priceRange[0]}
            min="0"
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]],
              })
            }
          />
          - 
          <input
            type="number"
            value={filters.priceRange[1]}
            max="50"
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={filters.AAA}
              onChange={(e) => setFilters({ ...filters, AAA: e.target.checked ? 1 : 0 })}
            />
            AAA ігри
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={filters.steamworks}
              onChange={(e) =>
                setFilters({ ...filters, steamworks: e.target.checked ? 1 : 0 })
              }
            />
            Steamworks
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(e) =>
                setFilters({ ...filters, onSale: e.target.checked ? 1 : 0 })
              }
            />
            Знижка
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={filters.hideDuplicates}
              onChange={(e) =>
                setFilters({ ...filters, hideDuplicates: e.target.checked })
              }
            />
            Сховати дуплікати
          </label>
        </div>
        <div>
          <label>Steam Рейтинг:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.steamRating}
            onChange={(e) =>
              setFilters({
                ...filters,
                steamRating: Number(e.target.value),
              })
            }
          />
          <span>{filters.steamRating}%+</span>
        </div>
      </div>

      {/* Таблиця */}
      <table className="deals-table">
        <thead>
          <tr>
            <th>Магазин</th>
            <th onClick={() => handleSort("savings")}>
              Знижка{" "}
              {sortConfig.key === "savings" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("salePrice")}>
              Ціна{" "}
              {sortConfig.key === "salePrice" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("title")}>
              Назва гри{" "}
              {sortConfig.key === "title" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("steamRating")}>
              Steam Рейтинг{" "}
              {sortConfig.key === "steamRating" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDeals.map((deal) => (
            <tr key={deal.dealID}>
              <td>
                <img
                  src={`https://www.cheapshark.com/img/stores/icons/${deal.storeID}.png`}
                  alt="Лого магазину"
                  className="store-logo"
                />
              </td>
              <td>{Math.round(deal.savings)}%</td>
              <td>
                <span className="price">${deal.salePrice}</span>
              </td>
              <td>{deal.title}</td>
              <td>
                {deal.steamRatingPercent
                  ? `${deal.steamRatingPercent}%`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Browse;
