import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SignInForm } from "./auth/SignInForm";
import { SignUpForm } from "./auth/SignUpForm";
import { LostPasswordForm } from "./auth/LostPasswordForm";
import ChangePasswordForm from "./auth/ChangePasswordForm";

import SignInImage from "./assets/sign-in.svg?react";
import SignUpImage from "./assets/sign-up.svg?react";

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
      <main
        className="w-screen h-screen gap-0 sm:flex columns-2 bg-gradient-to-r from-primary to-secondary "
      >
        <section className="relative flex w-full h-full">
          <img
            src="/gaelo-flow-white2.svg"
            className="absolute top-7 left-7"
            alt="Logo"
            style={{ width: "8.33%", maxWidth: "100%", height: "auto" }}
          />
          <div className="flex items-center justify-center w-full h-screen">
            {getImage()}
          </div>
        </section>
        <section
          className="flex items-center justify-center w-full bg-white rounded-tl-70"
          style={{ filter: "drop-shadow(-17px 0 10px rgba(91, 84, 84, 0.4))" }}
        >
          {/* Contenu de la section */}
          <div className="w-2/3">
            <Routes>
              <Route path="/*" element={<SignInForm />} />
              <Route path="/change-password" element={<ChangePasswordForm />} />
              <Route
                path="lost-password"
                element={<LostPasswordForm />}
              />
              <Route path="legal-mention" element={<div>Legal Mention</div>} />
              <Route
                path="sign-up"
                element={<SignUpForm />}
              />
            </Routes>
            <hr className="my-8 mt-20 border-primary" />
            <div className="flex justify-between mx-auto text-center text-balance">
              {location.pathname !== "/sign-up" && (
                <span
                  onClick={() => navigate("/sign-up")}
                  className={classLink}
                >
                  Don’t have an account?{" "}
                  <span className="text-primary">Sign Up</span>
                </span>
              )}

              {location.pathname !== "/" && (
                <span onClick={() => navigate("/")} className={classLink}>
                  Already have an account ?{" "}
                  <span className="text-primary">Login</span>{" "}
                </span>
              )}

              <span
                className={`${classLink} inline-block`}
                onClick={() => navigate("/legal-mention")}
              >
                Legal Mention
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Welcome;
