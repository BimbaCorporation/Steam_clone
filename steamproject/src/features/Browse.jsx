import React, { useState, useEffect } from 'react';
import { getDeals } from '../HttpClient/HttpClient'; // Імпортуємо клієнт

const Browse = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals(); // Отримуємо вигідні пропозиції
        setDeals(data);
        setLoading(false);
      } catch (err) {
        setError("Не вдалося отримати угоди");
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Вигідні пропозиції</h1>
      <ul>
        {deals.map(deal => (
          <li key={deal.dealID}>
            <strong>{deal.title}</strong> - {deal.salePrice} USD, збережено: {deal.savings}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Browse;
