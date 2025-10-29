import { JSX, Suspense } from "react";
import Loader from "../common/components/loader";

export const withSuspense = (component: JSX.Element) => (
  <Suspense fallback={<Loader />}>{component}</Suspense>
);
