import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import ForgotPasswordForm  from "./ForgotPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";

import SignInImage from "../assets/sign-in.svg?react";
import SignUpImage from "../assets/sign-up.svg?react";
import ArrowBack from "../assets/arrow-back.svg?react";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getImage = () => {
    switch (location.pathname) {
      case "/sign-in":
        return <SignInImage />;
      case "/sign-up":
        return <SignUpImage />;
      default:
        return <SignInImage />;
    }
  };

  const classLink =
    "text-gray-600 hover:underline hover:text-indigo-800 cursor-pointer";

  return (
    <>
      <main className="flex h-screen w-screen columns-2 gap-0 bg-gradient-to-r from-primary to-secondary ">
        <div className="relative flex size-full">
          <img
            src="/gaelo-flow-white2.svg"
            className="absolute left-7 top-7"
            alt="Logo"
            style={{ width: "8.33%", maxWidth: "100%", height: "auto" }}
          />
          <div className="flex h-screen w-full items-center justify-center">
            {getImage()}
          </div>
        </div>
        <div
          className="flex w-full items-center justify-center rounded-tl-70 bg-white"
          style={{ filter: "drop-shadow(-17px 0 10px rgba(91, 84, 84, 0.4))" }}
        >
          {/* Contenu de la section */}
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
              {location.pathname !== "/sign-up" &&
                location.pathname !== "/legal-mention" && (
                  <span
                    onClick={() => navigate("/sign-up")}
                    className={classLink}
                  >
                    Don’t have an account?
                  </span>
                )}

              {location.pathname !== "/" &&
                (location.pathname === "/legal-mention" ? (
                  <div
                    onClick={() => navigate("/")}
                  ><div className="cursor-pointer">
                      <ArrowBack />
                  </div>
                    <span>Back</span>
                  </div>
                ) : (
                  <span onClick={() => navigate("/")} className={classLink}>
                    Already have an account ?{" "}
                  </span>
                ))}
              {location.pathname !== "/legal-mention" && (
                <span
                  className={`${classLink} inline-block`}
                  onClick={() => navigate("/legal-mention")}
                >
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
