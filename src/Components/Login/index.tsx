import {useLocalStorage} from "@/hooks/use-local-storage";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import LoginForm from "./form";

export default function LoginComponent() {
  const navigate = useNavigate();
  const token = useLocalStorage().getItem("token");

  useEffect(() => {
    token && navigate("/");
  }, []);

  return (
    <div className="login flex items-center justify-center h-screen">
      <div className="login__form border w-1/3 p-8 rounded-xl">
        <h2 className="text-center text-3xl mb-12 font-bold">Kirish oynasi</h2>
        <LoginForm />
      </div>
    </div>
  );
}
