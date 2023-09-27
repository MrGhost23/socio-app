import { useState, useEffect, useCallback } from "react";
import axios, { Method } from "axios";
import { toast } from "react-toastify";

interface AxiosResponse<T> {
  data: T;
}

const useInfiniteFetch = <T,>(
  url: string,
  method: Method,
  displayToast?: boolean
) => {
  const [data, setData] = useState<T[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    async (reFetch?: boolean) => {
      try {
        let firstPage = 0;
        if (reFetch) {
          setLoading(true);
          setData([]);

          firstPage = 1;
        }

        const response: AxiosResponse<T[]> = await axios({
          method,
          url: `${url}?page=${firstPage || page}`,
        });

        setLoading(false);
        setHasMore(response.data.length === 10);

        setData((prevData) => {
          if (prevData) {
            return [...prevData, ...response.data];
          } else {
            setData(response.data);
          }
        });
      } catch (error) {
        setError(!!error);
        if (displayToast) {
          toast.info(`Something went wrong!`);
        }
      } finally {
        setLoading(false);
      }
    },
    [method, url, page, displayToast]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reFetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  const fetchMoreData = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return { data, setData, loading, error, hasMore, fetchMoreData, reFetch };
};

export default useInfiniteFetch;
