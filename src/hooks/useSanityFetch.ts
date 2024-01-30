import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const useSanityFetch = <T = any>(
  query: string,
  initialData?: T,
  dependencies: any[] = [],
): [T | undefined, boolean] => {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res: AxiosResponse<T> = await axios({
        method: 'post',
        url: `api/sanity/fetch`,
        headers: {
          'Content-type': 'application/json',
        },
        data: {
          query,
        },
      });

      setData(res.data);

      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, query]);

  return [data, loading];
};

export default useSanityFetch;
