import { useState, useEffect } from "react";
import axios, { Method } from "axios";

interface AxiosResponse<T> {
  data: T;
}

const useAxios = <T,>(url: string, method: Method, body?: object) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios({
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
