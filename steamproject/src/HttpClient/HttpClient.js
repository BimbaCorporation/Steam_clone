import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.cheapshark.com/api/1.0', // Базовий URL для API
  timeout: 10000, // Час очікування на запит (10 секунд)
  headers: {
    'Content-Type': 'application/json', // Заголовок для JSON запитів
  },
});

// Функція для отримання вигідних пропозицій (Deals)
export const getDeals = async () => {
  try {
    const response = await apiClient.get('/deals', {
      params: {
        
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
