/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import axios, { Method } from "axios";
import { toast } from "react-toastify";

interface AxiosResponse<T> {
  data: T;
}

const useInfiniteFetch = <T,>(
  url: string,
  method: Method,
  elementsPerRequest: number,
  uniqueKey: string,
  displayToast?: boolean,
  apiWillReturnTotal?: boolean,
  reverse?: boolean
) => {
  const [data, setData] = useState<T[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [total, setTotal] = useState(0);

  const getUniqueData = useCallback(
    (data: T[]) => {
      return [
        ...new Set(data.map((item: any) => item[uniqueKey] as string)),
      ].map((id) => {
        return data.find((item: any) => item[uniqueKey] === id)!;
      });
    },
    [uniqueKey]
  );

  const fetchData = useCallback(
    async (reFetch?: boolean) => {
      try {
        let firstPage = 0;
        if (reFetch) {
          setLoading(true);
          setHasMore(true);
          setData([]);

          firstPage = 1;
        }

        if (apiWillReturnTotal) {
          const response: AxiosResponse<{ data: T[]; total: number }> =
            await axios({
              method,
              url: `${url}?page=${firstPage || page}`,
            });

          setLoading(false);

          setHasMore(response.data.total > elementsPerRequest * page);

          setTotal(response.data.total);
          setData((prevData) => {
            if (prevData) {
              const allData: T[] = reverse
                ? [...response.data.data, ...prevData]
                : [...prevData, ...response.data.data];

              return getUniqueData(allData);
            } else {
              setData(response.data.data);
            }
          });
        } else {
          const response: AxiosResponse<T[]> = await axios({
            method,
            url: `${url}?page=${firstPage || page}`,
          });
          setLoading(false);

          setHasMore(response.data.length >= elementsPerRequest);
          setData((prevData) => {
            if (prevData) {
              const allData: T[] = reverse
                ? [...response.data, ...prevData]
                : [...prevData, ...response.data];

              return getUniqueData(allData);
            } else {
              setData(response.data);
            }
          });
        }
      } catch (error) {
        setError(!!error);
        if (displayToast) {
          toast.info(`Something went wrong!`);
        }
      } finally {
        setLoading(false);
      }
    },
    [
      apiWillReturnTotal,
      method,
      url,
      page,
      elementsPerRequest,
      reverse,
      getUniqueData,
      displayToast,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reFetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  const fetchMoreData = useCallback(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore]);

  return {
    data,
    total,
    loading,
    error,
    hasMore,
    setData,
    fetchMoreData,
    reFetch,
  };
};

export default useInfiniteFetch;
