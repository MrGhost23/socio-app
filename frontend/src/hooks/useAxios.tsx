import { useState, useEffect } from "react";
import axios, { Method } from "axios";

const useAxios = (url: string, method: Method, body?: object) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method,
          url,
          data: body,
        });
        setData(response.data);
      } catch (error) {
        setError(!!error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, loading, error };
};

export default useAxios;
