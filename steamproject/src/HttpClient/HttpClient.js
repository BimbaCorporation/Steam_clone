import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.cheapshark.com/api/1.0', // Базовий URL для API
  timeout: 10000, // Час очікування на запит (10 секунд)
  headers: {
    'Content-Type': 'application/json', // Заголовок для JSON запитів
  },
});

// Функція для отримання вигідних пропозицій (Deals) з підтримкою фільтрів
export const getDeals = async (filters = {}) => {
  try {
    const response = await apiClient.get('/deals', {
      params: {
        storeID: filters.storeID || undefined,
        upperPrice: filters.upperPrice || undefined,
        lowerPrice: filters.lowerPrice || undefined,
        sortBy: filters.sortBy || "DealRating",
        desc: filters.desc || 0,
        metacritic: filters.metacritic || undefined,
        steamRating: filters.steamRating || undefined,
        title: filters.title || undefined,
        exact: filters.exact || 0,
        AAA: filters.AAA || 0,
        steamworks: filters.steamworks || 0,
        onSale: filters.onSale || 0,
        pageSize: filters.pageSize || 60,
        pageNumber: filters.pageNumber || 0,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching deals: ", error);
    throw error;
  }
};

export const getStores = async () => {
  try {
    const response = await apiClient.get('/stores');
    return response.data;
  } catch (error) {
    console.error("Error fetching stores: ", error);
    throw error;
  }
};

export const searchGamesByTitle = async (title) => {
  try {
    const response = await apiClient.get('/deals', {
      params: { title }, // Параметр для пошуку за назвою
    });
    return response.data;
  } catch (error) {
    console.error("Error searching games by title: ", error);
    throw error;
  }
};
