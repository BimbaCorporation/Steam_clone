import { useState, useEffect } from "react";
import { getDeals } from "../HttpClient/cheapshark";

const useDeals = () => {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    priceRange: [0, 50],
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data);
        setFilteredDeals(data);
      } catch (err) {
        setError("Не вдалося отримати угоди");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    let filtered = deals;

    // Фільтрація за назвою
    if (filters.title) {
      filtered = filtered.filter((deal) =>
        deal.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    // Фільтрація за діапазоном цін
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

  return {
    deals,
    filteredDeals,
    loading,
    error,
    filters,
    setFilters,
    sortConfig,
    handleSort,
  };
};

export default useDeals;
