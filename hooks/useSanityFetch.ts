import { useEffect, useState } from 'react';
import { getClient } from '../lib/sanity.server';

const useSanityFetch = <T = any>(
  query: string,
  initialData?: T,
): [T, boolean] => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState<T>(initialData as T);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // TODO fix data fetching
      // eslint-disable-next-line no-unused-vars
      const res = await getClient().fetch(query);

      // setData(res);
      setLoading(false);
    };

    fetchData();
  });

  return [data, loading];
};

export default useSanityFetch;
