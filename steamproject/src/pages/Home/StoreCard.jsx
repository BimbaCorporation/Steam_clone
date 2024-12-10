import React from 'react';

const StoreCard = ({ store }) => {
  return (
    <div className="store-card">
      <img
        src={`https://www.cheapshark.com${store.images.banner}`}
        alt={store.storeName}
        className="store-card-image"
      />
      <div className="store-card-content">
        <h2 className="store-card-name">{store.storeName}</h2>
        <a href={store.storeURL} className="store-card-link" target="_blank" rel="noopener noreferrer">
          Перейти
        </a>
      </div>
    </div>
  );
};

export default StoreCard;
