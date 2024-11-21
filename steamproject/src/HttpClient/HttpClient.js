import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.cheapshark.com/api/1.0', // Базовий URL для API
  timeout: 10000, // Час очікування на запит (10 секунд)
  headers: {
    'Content-Type': 'application/json', // Заголовок для JSON запитів
  },
});

// Функція для отримання всіх ігор
export const getGames = async (gameIds = []) => {
  try {
    // Якщо передано gameIds, формуємо запит
    const idsParam = gameIds.length ? gameIds.join(',') : '';
    const response = await apiClient.get('/games', {
      params: { ids: idsParam, format: 'array' }, // Параметри для запиту
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games: ", error);
    throw error;
  }
};

// Функція для отримання вигідних пропозицій (Deals)
export const getDeals = async () => {
  try {
    const response = await apiClient.get('/deals');
    return response.data;
  } catch (error) {
    console.error("Error fetching deals: ", error);
    throw error;
  }
};

// Функція для отримання інформації про магазини
export const getStores = async () => {
  try {
    const response = await apiClient.get('/stores');
    return response.data;
  } catch (error) {
    console.error("Error fetching stores: ", error);
    throw error;
  }
};
