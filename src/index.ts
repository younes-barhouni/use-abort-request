import {MutableRefObject, useCallback, useEffect, useRef} from 'react';

/**
 * useAbortRequest
 * @description
 * Create special effect using The AbortController interface
 * Allows us to abort one fetch requests as and when desired
 * for instance when the component unmount
 */
const useAbortRequest = (): () => AbortSignal => {
  // create objectRef to hold the AbortController
  const abortControllerRef: MutableRefObject<AbortController|null> = useRef(null);
  // retrieve the AbortController
  const getAbortController: () => AbortController = useCallback(() => {
    if (!abortControllerRef.current) {
      abortControllerRef.current = new AbortController();
    }
    return abortControllerRef.current;
  }, []);

  // component unmount
  useEffect(() => {
    return (): void => getAbortController().abort();
  }, [getAbortController]);

  // return the AbortController signal
  return useCallback(() => getAbortController().signal, [getAbortController]);
};

export default useAbortRequest;
