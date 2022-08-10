import React, { FunctionComponent } from 'react';
import { createRoot } from "react-dom/client";
import { useAbortRequestCallback, useAbortRequestMemo } from "./index";


const ExampleComponent: FunctionComponent = (): JSX.Element => {
  // With useCallback:
  const getSignal: () => AbortSignal = useAbortRequestCallback();
  // We need to call the function to get the abort controller signal.
  fetch('https://example.com', {signal: getSignal()});

  // Whereas with useMemo:
  const signal: AbortSignal = useAbortRequestMemo();
  // The value is the same, but there is no need to call any function since the hook directly returns the value.
  fetch('https://example.com', {signal});

  // In both cases, the result is a single `signal` that can be used to coordinate several requests,
  // since the value kept in useMemo is preserved between re-renders,
  // same for the functions with useCallback.

  return (<div>I am an example.</div>);
};

const DestroyButton: FunctionComponent = (): JSX.Element => {
  const onClick: VoidFunction = (): void => {
    root.unmount();
  }

  return (<button onClick={onClick}>Unmount the example component</button>);
}

const root = createRoot(document.getElementById('root'));
root.render(<><ExampleComponent/><DestroyButton/></>);
