import {Suspense, lazy} from "react";

const HomeComponent = lazy(() => import("@/Components/Home/index"));

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponent />
    </Suspense>
  );
}
