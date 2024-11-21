import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SignUpForm } from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { SignInForm } from "./SignInForm";
import SignUpImage from "../assets/sign-up.svg";
import { ArrowBack } from "../assets";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getImage = () => {
    let imageComponent;
    switch (location.pathname) {
      case "/sign-in":
        imageComponent = SignUpImage;
        break;
      case "/sign-up":
        imageComponent = SignUpImage;
        break;
      default:
        imageComponent = SignUpImage;
    }
    return <div className="w-full max-w-2xl mx-auto">
      <img src={imageComponent} alt="Sign Up" /> 
    </div>;
  };

  const classLink = "text-gray-600 hover:underline hover:text-indigo-800 cursor-pointer";

  return (
    <main className="flex w-screen h-screen bg-gradient-to-r from-primary to-secondary dark:from-blue-900 dark:to-orange-800 bg-opacity-5">
      <div className="relative flex items-center justify-center w-1/2 h-full">
        <img
          src="/gaelo-flow-white2.svg"
          className="absolute w-20 h-auto max-w-full left-7 top-7"
          alt="Logo"
        />
        {getImage()}
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

          <hr className="w-full my-8 mt-20 border-primary dark:border-white dark:hover:text-indigo-300" />

          <div className="flex justify-between mx-auto text-center text-balance">
            {location.pathname !== "/sign-up" && location.pathname !== "/legal-mention" && (
              <span onClick={() => navigate("/sign-up")} className={`${classLink} dark:text-white dark:hover:text-indigo-300`}>
                Don’t have an account?
              </span>
            )}

            {location.pathname === "/legal-mention" ? (
              <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
                <ArrowBack />
                <span className="text-gray-600 dark:text-white dark:hover:text-indigo-300">Back</span>
              </div>
            ) : (
              <span onClick={() => navigate("/")} className={`${classLink} dark:text-white dark:hover:text-indigo-300`}>
                Already have an account?
              </span>
            )}

            {location.pathname !== "/legal-mention" && (
              <span
                className={`${classLink} inline-block dark:text-white dark:hover:text-indigo-300`}
                onClick={() => navigate("/legal-mention")}
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
