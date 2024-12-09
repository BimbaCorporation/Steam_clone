import React, { useState } from "react";
import BrowseTable from "./BrowseTable";
import SearchInput from "./SearchInput";

const BrowseContainer = ({ deals }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Фільтр тільки для таблиці
  const filteredDeals = deals.filter((deal) =>
    deal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container">
      <SearchInput searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <BrowseTable filteredDeals={filteredDeals} />
    </div>
  );
};

export default BrowseContainer;
