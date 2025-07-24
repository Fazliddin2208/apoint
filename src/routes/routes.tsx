import {Route, Routes} from "react-router-dom";
import NotFound from "@/pages/not-found";
import { MainLayout } from "@/layout/main-layout";
import { routesList } from "./routes-list";
import Login from "@/pages/login";

interface RouteTypes {
  path?: string;
  page?: React.ReactNode;
}

export const ROUTES = () => {

  const mainRoutes = routesList.map((page: RouteTypes) => {
    return <Route key={page.path} path={page.path} element={page.page} />
  });

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {mainRoutes}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
