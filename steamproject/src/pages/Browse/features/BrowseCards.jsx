import React from "react";

const BrowseCards = ({ deals }) => {
  return (
    <div className="card-grid">
      {deals.map((deal) => (
        <a
          href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
          key={deal.dealID}
        >
          <div className="card">
            <div className="card-top">
              <img
                src={deal.thumb}
                alt={deal.title}
                className="card-image"
              />
              <h3 className="card-title">{deal.title}</h3>
            </div>
            <div className="card-bottom">
              <p>
                Магазин: <span>{deal.storeID}</span>
              </p>
              <p>
                Знижка: <span>{Math.round(deal.savings)}%</span>
              </p>
              <p>
                Ціна: <span>${deal.salePrice}</span>
              </p>
              <p>
                Рейтинг:{" "}
                <span>
                  {deal.steamRatingText
                    ? `${deal.steamRatingText} (${deal.steamRatingPercent}%)`
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default BrowseCards;
