import React, { useState, useEffect } from "react";
import { getDeals } from "../HttpClient/HttpClient";
import "../styles/Browse.css";

const Browse = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    lowerPrice: 0,
    upperPrice: 50,
    AAA: 0,
    steamworks: 0,
    onSale: 0,
    steamRating: 70,
    sortBy: "DealRating",
    desc: 0,
    pageSize: 60,
    pageNumber: 0,
  });

  // Завантаження даних
  const fetchDeals = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDeals(filters);
      setDeals(data);
    } catch (error) {
      setError("Не вдалося завантажити пропозиції.");
    } finally {
      setLoading(false);
    }
  };

  // Завантаження даних при зміні фільтрів
  useEffect(() => {
    fetchDeals();
  }, [filters]);

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
            value={filters.lowerPrice}
            min="0"
            onChange={(e) =>
              setFilters({ ...filters, lowerPrice: Number(e.target.value) })
            }
          />
          -
          <input
            type="number"
            value={filters.upperPrice}
            max="50"
            onChange={(e) =>
              setFilters({ ...filters, upperPrice: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={!!filters.AAA}
              onChange={(e) => setFilters({ ...filters, AAA: e.target.checked ? 1 : 0 })}
            />
            AAA ігри
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={!!filters.steamworks}
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
              checked={!!filters.onSale}
              onChange={(e) =>
                setFilters({ ...filters, onSale: e.target.checked ? 1 : 0 })
              }
            />
            Знижка
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
        <div>
          <label>Сортування:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="DealRating">Рейтинг пропозицій</option>
            <option value="Price">Ціна</option>
            <option value="Savings">Знижка</option>
            <option value="Metacritic">Metacritic</option>
            <option value="Reviews">Відгуки</option>
          </select>
        </div>
      </div>

      {/* Таблиця */}
      <table className="deals-table">
        <thead>
          <tr>
            <th>Магазин</th>
            <th>Знижка</th>
            <th>Ціна</th>
            <th>Назва гри</th>
            <th>Steam Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.dealID}>
              <td>
                <img
                  src={`https://www.cheapshark.com/img/stores/icons/${deal.storeID}.png`}
                  alt="Лого магазину"
                  className="store-logo"
                />
              </td>
              <td>{Math.round(deal.savings)}%</td>
              <td>${deal.salePrice}</td>
              <td>{deal.title}</td>
              <td>{deal.steamRatingPercent || "N/A"}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Browse;
