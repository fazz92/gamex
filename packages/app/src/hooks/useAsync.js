import { useCallback, useEffect, useState } from 'react';

import { apiRequest } from 'utils';

export const useAsync = ({ method, url, immediate = true, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const executor = useCallback(async() => {
    setLoading(true);

    try {
      const response = await apiRequest({ method, url, ...rest  });
      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (immediate) {
      executor();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executor]);

  return { executor, loading, data, error };
};
