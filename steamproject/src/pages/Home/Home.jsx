import React, { useState, useEffect } from "react";
import { getStores } from "../../HttpClient/cheapshark";
import StoreCard from "./StoreCard"; // Компонент для відображення картки магазину
import LoadingSpinner from "./LoadingSpinner"; // Компонент для показу індикатора завантаження
import ErrorMessage from "./ErrorMessage"; // Компонент для показу помилки
import useIsLoader from "../../hooks/useIsLoader"; // Підключаємо хук
import "../../styles/Home.css"; // стилі для компонента

const Home = () => {
  const { isLoading, startLoading, stopLoading } = useIsLoader(); // Використовуємо хук
  const [stores, setStores] = useState([]); // Стан для зберігання списку магазинів
  const [error, setError] = useState(null); // Стан для зберігання помилки, якщо вона виникла

  useEffect(() => {
    // Функція для отримання списку магазинів з API
    const fetchStores = async () => {
      startLoading(); // Починаємо завантаження
      setError(null); // Очищуємо попередню помилку

      try {
        const data = await getStores(); // Отримуємо дані
        setStores(data); // Зберігаємо отримані магазини в стан
      } catch (err) {
        setError("Не вдалося отримати магазини"); // Встановлюємо помилку у разі збою
      } finally {
        stopLoading(); // Завантаження завершено
      }
    };

    fetchStores(); // Викликаємо функцію для завантаження магазинів
  }, []); // useEffect викликається лише один раз після рендеру компонента

  if (isLoading) return <LoadingSpinner />; // Показуємо індикатор завантаження
  if (error) return <ErrorMessage message={error} />; // Показуємо повідомлення про помилку

  return (
    <div className="stores-container">
      <h1 className="stores-title">Магазини</h1>
      <div className="card-container">
        {/* Відображаємо список карток магазинів */}
        {stores.map((store) => (
          <StoreCard key={store.storeID} store={store} />
        ))}
      </div>
    </div>
  );
};

export default Home;
