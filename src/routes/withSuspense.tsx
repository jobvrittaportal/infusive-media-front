import { JSX, Suspense } from "react";

export const withSuspense = (component: JSX.Element) => (
  <Suspense fallback={<div>loading..... </div>}>{component}</Suspense>
);
