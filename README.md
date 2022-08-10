# use-abort-request

A React hook written in TypeScript to easily abort all ongoing requests relative to a component when it unmounts, and thus save some calculation and prevent memory leaks.

## Why should I worry about aborting requests?
When you have a component that fetches data from an API, the request can take some time to complete. If the component unmounts because of changing pages or closing a modal (for example), **the request will still continue in the background, despite not being relevant anymore**! 

This problem gets only worse if you have (potentially heavy) code executed once the request is completed.

This is why the useAbortRequest was written: to have an **easy way of cutting this problem off at the source**.

## Installation

You only need to copy the code from `index.ts` into your project, and you can use it as a regular hook.

## How to use

You need to import the `useAbortRequest` hook in your component:

```tsx
import useAbortRequest from '<the file where you copied the code>';
```

Then you can use it:

```tsx
const getSignal: () => AbortSignal = useAbortRequest();
```

The hook returns a callback that gives you the signal to use when you want to abort any request.

You use it with the `fetch` API when preparing a request, so that it can be aborted later if necessary.

```tsx
fetch(url, { signal: getSignal() });
```

This signal is part of the native `AbortController` JavaScript API. It is used here to create an `abort` event on component unmount, that you can then use to abort the request.
