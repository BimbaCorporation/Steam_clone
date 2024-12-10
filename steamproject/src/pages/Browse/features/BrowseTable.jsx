import React from "react";

const BrowseTable = ({ deals }) => {
  return (
    <table className="deals-table">
      <thead>
        <tr>
          <th>Магазин</th>
          <th>Знижка</th>
          <th>Ціна</th>
          <th>Назва гри</th>
          <th>Steam Рейтинг</th>
          <th>Дата релізу</th>
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
  );
};

export default BrowseTable;
