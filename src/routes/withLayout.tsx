import { JSX, Suspense } from "react";
import AppLayout from "../common/components/layout";
import Loader from "../common/components/loader";


export const withLayout = (component: JSX.Element) => (
  <Suspense fallback={<Loader />}>   
    <AppLayout>{component}</AppLayout>
  </Suspense>
);
