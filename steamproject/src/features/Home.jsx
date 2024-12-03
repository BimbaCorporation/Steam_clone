import React, { useState, useEffect } from 'react';
import { getStores } from '../HttpClient/HttpClient';
import "../styles/Home.css"

const Home = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStores();
        setStores(data);
        setLoading(false);
      } catch (err) {
        setError("Не вдалося отримати магазини");
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) return <div className="loading-container">Завантаження...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="stores-container">
      <h1 className="stores-title">Магазини</h1>
      <div className="card-container">
        {stores.map(store => (
          <div key={store.storeID} className="store-card">
            <img
              src={`https://www.cheapshark.com${store.images.banner}`}
              alt={store.storeName}
              className="store-card-image"
            />
            <div className="store-card-content">
              <h2 className="store-card-name">{store.storeName}</h2>
              <button href={store.storeURL} className="store-card-link">Перейти</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;