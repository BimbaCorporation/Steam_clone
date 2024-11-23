import React, { useState, useEffect } from "react";
import { getDeals } from "../HttpClient/HttpClient"; // Використовуємо нову версію getDeals без пагінації
import "../styles/Browse.css";

const Browse = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filters, setFilters] = useState({
    title: "",
    priceRange: [0, 50],
  });

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals(); // Отримуємо всі угоди
        setDeals(data); // Зберігаємо угоди
        setFilteredDeals(data); // Встановлюємо відфільтровані угоди
        setLoading(false); // Завершення завантаження
      } catch (err) {
        setError("Не вдалося отримати угоди");
        setLoading(false);
      }
    };

    fetchDeals();
  }, []); // Викликається лише один раз при монтуванні компонента

  useEffect(() => {
    let filtered = deals;

    // Фільтри
    if (filters.title) {
      filtered = filtered.filter((deal) =>
        deal.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(
        (deal) => deal.salePrice >= min && deal.salePrice <= max
      );
    }

    setFilteredDeals(filtered);
  }, [filters, deals]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sorted = [...filteredDeals].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredDeals(sorted);
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

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
            <th onClick={() => handleSort("releaseDate")}>
              Дата релізу{" "}
              {sortConfig.key === "releaseDate" &&
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
                <span className="price">${deal.salePrice}</span>{" "}
                <span className="retail-price">${deal.retailPrice}</span>
              </td>
              <td>
                <div className="game-title">
                  <img
                    src={deal.thumb}
                    alt={deal.title}
                    className="game-thumbnail"
                  />
                  <a
                    href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {deal.title}
                  </a>
                </div>
              </td>
              <td>
                {deal.steamRatingText
                  ? `${deal.steamRatingText} (${deal.steamRatingPercent}%)`
                  : "N/A"}
              </td>
              <td>
                {deal.releaseDate
                  ? new Date(deal.releaseDate * 1000).toLocaleDateString()
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
