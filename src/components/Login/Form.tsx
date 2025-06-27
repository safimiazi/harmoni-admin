"use client";
import React from "react";
import { Button } from "../ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { Loader } from "lucide-react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const navigate = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    // console.log("Hello world", email, password);
    const LoginData = { email, password };
    if (LoginData) {
      const response = await login(LoginData);

      if (response?.data?.success) {

        const token = response?.data?.data?.accessToken;
        cookies.set("token", token, { expires: 7})
        navigate.push("/admin")

      }
    }
  };
  return (
    <div className="w-full bg-[#331843] text-[#FDFCEE] font-Robot">
      <div className="flex items-center justify-center h-screen p-3">
        <div className="w-full max-w-md space-y-10">
          <h1 className="text-4xl sm:text-5xl font-semibold text-center text-">
            Admin Dashboard
          </h1>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="flex flex-col space-y-3">
              <label className="text-sm sm:text-[17px] text-[var(--color-textPrimary)]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={"mohibullamiazi@gmail.com"}
                placeholder="Enter your mail"
                className="py-2 px-5 sm:py-2.5 sm:px-6 rounded-[12px] border-2"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label className="text-sm sm:text-[17px] text-[var(--color-textPrimary)]">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={"Admin123"}
                placeholder="Enter your password"
                className="py-2 px-5 sm:py-2.5 sm:px-6 rounded-[12px] border-2"
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="hover:bg-purple-800 te cursor-pointer w-full bg-[var(--color-accent)] text-[var(--color-textPrimary )] py-5.5 px-5 sm:px-6 text-[16px] sm:text-lg"
              >
                {isLoading ? (
                  <Loader className="animate-spin w-2 h-2" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
