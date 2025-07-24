import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DashboardContent from "./dashboard";
import {useLocalStorage} from "@/hooks/use-local-storage";
import Header from "@/Components/Header";

export const MainLayout = () => {
  const navigate = useNavigate();
  const token = useLocalStorage().getItem("token");

  useEffect(() => {
    !token && navigate("/login");
  });
  return (
    <div className="flex flex-col ">
      <Header />
      <DashboardContent />
    </div>
  );
};
