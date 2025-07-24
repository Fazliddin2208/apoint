import {useLocalStorage} from "@/hooks/use-local-storage";
import {useService} from "@/hooks/use-service";
import {login} from "@/services/login";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function LoginForm() {
  const {data: userInfo, isLoading, execute: handleLogin} = useService<any>(login);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.username && values.password) {
      const data = {
        username: values.username,
        password: values.password,
      };
      await handleLogin(data);
    } else {
      toast.error("Maydonlar to'ldirilishi shart!");
    }
  };

  useEffect(() => {
    if (userInfo) {
      useLocalStorage().setItem("token", userInfo?.token?.token);
      useLocalStorage().setItem("user", userInfo);
      navigate("/");
    }
  }, [userInfo]);
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="border-b focus:outline-0 pb-2"
        onChange={(e) => setValues({...values, username: e.target.value})}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border-b focus:outline-0 pb-2"
        onChange={(e) => setValues({...values, password: e.target.value})}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`relative flex items-center justify-center bg-white text-black py-2 rounded-lg font-semibold text-lg mt-2 transition-opacity ${
          isLoading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <>
            <span className="loader mr-2"></span>
            Yuklanmoqda...
          </>
        ) : (
          "Kirish"
        )}
      </button>
    </form>
  );
}
