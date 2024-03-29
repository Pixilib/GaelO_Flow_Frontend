import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";

import SignInImage from "../assets/sign-in.svg?react";
import SignUpImage from "../assets/sign-up.svg?react";
import ArrowBack from "../assets/arrow-back.svg?react";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getImage = () => {
    let imageComponent;
    switch (location.pathname) {
      case "/sign-in":
        imageComponent = <SignInImage />;
        break;
      case "/sign-up":
        imageComponent = <SignUpImage />;
        break;
      default:
        imageComponent = <SignInImage />;
    }
    return <div className="mx-auto w-1/2">{imageComponent}</div>;
  };

  const classLink = "text-gray-600 hover:underline hover:text-indigo-800 cursor-pointer";

  return (
    <>
      <main className="flex h-screen w-screen grid-cols-2 gap-0 bg-gradient-to-r from-primary to-secondary">
        <div className="relative flex size-full items-center justify-center">
          <img
            src="/gaelo-flow-white2.svg"
            className="absolute left-7 top-7 h-auto w-20"
            alt="Logo"
          />
          {getImage()}
        </div>
        <div className="flex w-full items-center justify-center rounded-l-3xl bg-white shadow-xl">
          <div className="w-2/3">
            <Routes>
              <Route path="/*" element={<SignInForm />} />
              <Route path="/change-password" element={<ChangePasswordForm />} />
              <Route path="lost-password" element={<ForgotPasswordForm />} />
              <Route path="legal-mention" element={<div>Legal Mention</div>} />
              <Route path="sign-up" element={<SignUpForm />} />
            </Routes>

            <hr className="my-8 mt-20 border-primary" />
            <div className="mx-auto flex justify-between text-balance text-center">
              {location.pathname !== "/sign-up" && location.pathname !== "/legal-mention" && (
                <span onClick={() => navigate("/sign-up")} className={classLink}>
                  Don’t have an account?
                </span>
              )}

              {location.pathname !== "/" && (
                location.pathname === "/legal-mention" ? (
                  <div onClick={() => navigate("/")} className="flex cursor-pointer items-center gap-2">
                    <ArrowBack />
                    <span>Back</span>
                  </div>
                ) : (
                  <span onClick={() => navigate("/")} className={classLink}>
                    Already have an account?
                  </span>
                )
              )}
              {location.pathname !== "/legal-mention" && (
                <span className={`${classLink} inline-block`} onClick={() => navigate("/legal-mention")}>
                  Legal Mention
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Welcome;
