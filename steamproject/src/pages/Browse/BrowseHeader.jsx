import React from "react";

const BrowseHeader = ({ filters, setFilters, viewMode, setViewMode }) => {
  return (
    <div className="browse-header">
      <h1>Вигідні пропозиції</h1>
      <div className="view-toggle">
        <button
          onClick={() => setViewMode("table")}
          className={viewMode === "table" ? "active" : ""}
        >
          Таблиця
        </button>
        <button
          onClick={() => setViewMode("cards")}
          className={viewMode === "cards" ? "active" : ""}
        >
          Картки
        </button>
      </div>
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
    </div>
  );
};

export default BrowseHeader;
