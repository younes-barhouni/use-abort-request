import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from "react";

/**
 * useAbortRequest
 * @description
 * Create special effect using The AbortController interface
 * Allows us to abort one fetch requests as and when desired
 * for instance when the component unmount
 */
const useAbortRequestCallback = (): () => AbortSignal => {
  // create objectRef to hold the AbortController
  const abortControllerRef: MutableRefObject<AbortController|null> = useRef(null);
  // retrieve the AbortController
  const getAbortController: () => AbortController = useCallback(() => {
    if (!abortControllerRef.current) {
      console.log("creating new AbortController (useCallback)");
      abortControllerRef.current = new AbortController();
    }
    return abortControllerRef.current;
  }, []);

  // component unmount
  useEffect(() => {
    return (): void => {
      console.log("Aborting! (useCallback)");
      getAbortController().abort();
    };
  }, [getAbortController]);

  // return the AbortController signal
  return useCallback(() => getAbortController().signal, [getAbortController]);
};

/**
 * useAbortRequest
 * @description
 * Create special effect using The AbortController interface
 * Allows us to abort one fetch requests as and when desired
 * for instance when the component unmount
 */
const useAbortRequestMemo = (): AbortSignal => {
  // memoize the AbortController to avoid re-creating it
  const abortController: AbortController = useMemo(() => {
    console.log("creating new AbortController (useMemo)");
    return new AbortController();
  }, []);

  // component unmount
  useEffect(() => {
    return (): void => {
      console.log("Aborting! (useMemo)");
      abortController.abort();
    };
  }, []);

  // return the AbortController signal
  return useMemo(() => abortController.signal, []);
};

export { useAbortRequestCallback, useAbortRequestMemo };
