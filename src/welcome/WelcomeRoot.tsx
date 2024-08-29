import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SignUpForm } from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { SignIn as SignInImage, SignUp as SignUpImage, ArrowBack } from "../assets";
import { SignInForm } from "./SignInForm";

const Welcome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getImage = () => {
    let imageComponent;
    switch (location.pathname) {
      case "/sign-in":
        imageComponent = <SignInImage className="w-full h-auto max-w-2xl" />;
        break;
      case "/sign-up":
        imageComponent = <SignUpImage className="w-full h-auto max-w-2xl" />;
        break;
      default:
        imageComponent = <SignInImage className="w-full h-auto max-w-2xl" />;
    }
    return <div className="w-full max-w-2xl mx-auto">{imageComponent}</div>;
  };

  const classLink = "text-gray-600 hover:underline hover:text-indigo-800 cursor-pointer";

  return (
    <main className="flex w-screen h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="relative flex items-center justify-center w-1/2 h-full">
        <img
          src="/gaelo-flow-white2.svg"
          className="absolute w-12 h-auto max-w-full left-7 top-7"
          alt="Logo"
        />
        {getImage()}
      </div>
      <div className="flex items-center justify-center w-1/2 bg-white shadow-xl ">
        <div className="w-full max-w-md p-4"> {/* Reduced padding */}
          <Routes>
            <Route path="/*" element={<SignInForm />} />
            <Route path="/change-password" element={<ChangePasswordForm />} />
            <Route path="lost-password" element={<ForgotPasswordForm />} />
            <Route path="legal-mention" element={<div>Legal Mention</div>} />
            <Route path="sign-up" element={<SignUpForm />} />
          </Routes>

          <hr className="w-full my-8 mt-20 border-primary" />
          <div className="flex justify-between mx-auto text-center text-balance">
            {location.pathname !== "/sign-up" && location.pathname !== "/legal-mention" && (
              <span onClick={() => navigate("/sign-up")} className={classLink}>
                Don’t have an account?
              </span>
            )}

            {location.pathname !== "/" && (
              location.pathname === "/legal-mention" ? (
                <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
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
  );
};

export default Welcome;
