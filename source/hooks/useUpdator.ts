import { useMemo, useState } from 'react';

export const useUpdator = () => {
  const [signal, setSignal] = useState(0);

  return useMemo(
    () => ({
      signal,
      update() {
        setSignal(old => (old === Number.MAX_SAFE_INTEGER - 1 ? 0 : old + 1));
      },
    }),
    [signal]
  );
};
