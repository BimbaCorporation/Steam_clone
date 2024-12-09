import React, { useState, useEffect } from "react";
import { getDeals } from "../../HttpClient/cheapshark";
import BrowseHeader from "./BrowseHeader";
import BrowseTable from "./BrowseTable";
import BrowseCards from "./BrowseCards";
import useIsLoader from "../../hooks/useIsLoader"; // Підключаємо хук
import "../../styles/Browse.css";

const Browse = () => {
  const { isLoading, startLoading, stopLoading } = useIsLoader(); // Використовуємо хук
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    priceRange: [0, 50],
  });
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    const fetchDeals = async () => {
      startLoading(); // Починаємо завантаження
      setError(null);

      try {
        const data = await getDeals();
        setDeals(data);
        setFilteredDeals(data);
      } catch (err) {
        setError("Не вдалося отримати угоди");
      } finally {
        stopLoading(); // Завершуємо завантаження
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    let filtered = deals;

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

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="browse-container">
      <BrowseHeader filters={filters} setFilters={setFilters} viewMode={viewMode} setViewMode={setViewMode} />
      {viewMode === "table" ? (
        <BrowseTable deals={filteredDeals} />
      ) : (
        <BrowseCards deals={filteredDeals} />
      )}
    </div>
  );
};

export default Browse;
