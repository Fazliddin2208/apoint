import {Suspense, lazy} from "react";

const LoginComponent = lazy(() => import("@/Components/Login/index"));

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
}
