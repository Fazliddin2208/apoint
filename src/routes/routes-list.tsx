import HomePage from "@/pages/home";
import type {ReactNode} from "react";

interface IRoutesModel {
  path: string;
  page: ReactNode;
}

export const routesList: IRoutesModel[] = [
  {path: "/", page: <HomePage />},
];
