import { useCallback, useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

type Params = { [k: string]: string };
type UpdateSeachParamsFunc = (old: Params) => URLSearchParamsInit;

export function useCustomSearchParams<T extends Params>() {
  const [_searchParms, _setSearchParams] = useSearchParams();
  const searchParms = useMemo(
    () => Object.fromEntries(new URLSearchParams(_searchParms)) as T,
    [_searchParms]
  );
  const setSearchParams = useCallback(
    (
      nextInit: Params | UpdateSeachParamsFunc,
      navigateOptions?:
        | {
            replace?: boolean | undefined;
            state?: any;
          }
        | undefined
    ) => {
      if (typeof nextInit === 'function') {
        _setSearchParams(nextInit(searchParms), navigateOptions);
      } else {
        _setSearchParams(nextInit, navigateOptions);
      }
    },
    [_setSearchParams, searchParms]
  );

  return useMemo(() => ({ searchParms, setSearchParams }), [searchParms, setSearchParams]);
}
