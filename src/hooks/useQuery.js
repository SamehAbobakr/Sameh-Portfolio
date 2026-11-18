import { useEffect, useState } from 'react';

export function useQuery(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    let live = true;
    setState({ data: null, error: null, loading: true });
    fetcher().then((data) => live && setState({ data, error: null, loading: false }))
             .catch((error) => live && setState({ data: null, error, loading: false }));
    return () => { live = false; };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return state;
}
