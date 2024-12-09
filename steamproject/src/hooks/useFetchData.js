import { useState, useEffect } from "react";

const useFetchData = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError("Не вдалося отримати дані");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

export default useFetchData;
