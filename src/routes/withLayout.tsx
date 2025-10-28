import { JSX, Suspense } from "react";
// import AppLayout from "../config/default/default";
// import { Loader } from "../components";
import AppLayout from "../common/components/layout";

export const withLayout = (component: JSX.Element) => (
  <Suspense fallback={<div>loading..... </div>}>
    <AppLayout>{component}</AppLayout>
  </Suspense>
);
