import React, { useEffect, useState, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { SignUpForm } from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { SignIn as SignInImage, SignUp as SignUpImage, SignInUpDark as SignUpImageDark, signIndark as SignInImageDark, ArrowBack } from "../assets";
import { SignInForm } from "./SignInForm";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getImage = useMemo(() => {
    if (location.pathname === "/sign-up") {
      return isDark ? (
        <SignUpImageDark className="w-full h-auto max-w-2xl" />
      ) : (
        <SignUpImage className="w-full h-auto max-w-2xl" />
      );
    }
    return isDark ? (
      <SignInImageDark className="w-full h-auto max-w-2xl" />
    ) : (
      <SignInImage className="w-full h-auto max-w-2xl" />
    );
  }, [location.pathname, isDark]);

  const classLink = "text-gray-600 hover:underline hover:text-indigo-800 cursor-pointer";

  return (
    <main className="flex w-screen h-screen bg-gradient-to-r from-primary to-secondary dark:from-blue-900 dark:to-orange-800 bg-black/5">
      <div className="relative flex items-center justify-center w-1/2 h-full">
        <img
          src="/gaelo-flow-white2.svg"
          className="absolute w-20 h-auto max-w-full left-7 top-7"
          alt="Logo"
        />
        <div className="w-full max-w-2xl mx-auto">{getImage}</div>
      </div>
      <div className="flex items-center justify-center w-1/2 bg-white shadow-xl dark:bg-stone-900">
        <div className="w-full max-w-md p-4">
          <Routes>
            <Route path="/*" element={<SignInForm />} />
            <Route path="/change-password" element={<ChangePasswordForm />} />
            <Route path="/lost-password" element={<ForgotPasswordForm />} />
            <Route path="/legal-mention" element={<div>Legal Mention</div>} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Routes>

          <hr className="w-full my-8 mt-20 border-primary dark:border-white" />

          <div className="flex justify-between mx-auto text-center text-balance">
            {location.pathname !== "/sign-up" && location.pathname !== "/legal-mention" && (
              <span
                onClick={() => navigate("/sign-up")}
                className={`${classLink} dark:text-white dark:hover:text-indigo-300`}
              >
                Don’t have an account?
              </span>
            )}

            {location.pathname === "/legal-mention" ? (
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <ArrowBack />
                <span className="text-gray-600 dark:text-white dark:hover:text-indigo-300">
                  Back
                </span>
              </div>
            ) : (
              <span
                onClick={() => navigate("/")}
                className={`${classLink} dark:text-white dark:hover:text-indigo-300`}
              >
                Already have an account?
              </span>
            )}

            {location.pathname !== "/legal-mention" && (
              <span
                onClick={() => navigate("/legal-mention")}
                className={`${classLink} inline-block dark:text-white dark:hover:text-indigo-300`}
              >
                Legal Mention
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
