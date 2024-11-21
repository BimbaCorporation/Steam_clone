import React, { useState, useEffect } from 'react';
import { getStores } from '../HttpClient/HttpClient'; // Імпортуємо клієнт

const Home = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStores(); // Отримуємо магазини
        setStores(data);
        setLoading(false);
      } catch (err) {
        setError("Не вдалося отримати магазини");
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Магазини</h1>
      <ul>
        {stores.map(store => (
          <li key={store.storeID}>
            <strong>{store.storeName}</strong> - <a href={store.storeURL}>Перейти</a> <br />
            <img
              src={`https://www.cheapshark.com${store.images.banner}`} // Додаємо домен перед шляхом
              alt={store.storeName}
              width="200"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;