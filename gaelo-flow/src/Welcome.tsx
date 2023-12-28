import { useState } from "react";
import { SignInForm } from "./auth/SignInForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppWelcomePage from "./RootComponents/AppWelcomePage";
import { RootState } from "./store";
import { SignUpForm } from "./auth/SignUpForm";

function Welcome() {
  const navigate = useNavigate();
  const isLogged = useSelector((state : RootState) => state.user.isLogged);

  const [displayComponent, setDisplayComponent] = useState<
    "login" | "lostPassword"| "signUp"
  >("login");


  const getComponent = () => {
    return (
      <div className="h-screen w-screen columns-2 gap-0 bg-gradient-to-r from-indigo-700 to-amber-500">
        <div className="h-full w-full">
          <img
            src="/gaelo-flow-white.png"
            className="absolute top-7 left-7 w-1/12"
          ></img>

          <div className="flex h-screen justify-center items-center w-12/12">
            <img
              src="/cloud.svg"
              style={{
                left: "400px",
                top: "300px",
                transform: "rotate(5deg)",
                width: "8%",
              }}
              className="absolute w-1/8 bottom-10"
            />
            <img src="/VisualHome.svg" alt="VisualHome Image" />
            <img
              src="/cloud.svg"
              style={{ left: "600px", transform: "rotate(5deg)" }}
              className="absolute w-1/8 bottom-80"
            />
          </div>
        </div>
        <div
          className="h-full w-full flex justify-center items-center bg-white rounded-tl-3xl"
          style={{ filter: "drop-shadow(-20px 0 20px rgba(50, 50, 50, 0.5))" }}
        >
          <div className="w-1/2">
            {displayComponent === "login" ? <SignInForm /> : null}
            {displayComponent === "lostPassword"
              ? "Lost Password Component"
              : null}
              {displayComponent === "signUp" ? <SignUpForm /> : null}
            <hr className="my-10 border-orange-300" />
            <div className="flex justify-between">
              <span
                className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer"
                onClick={() => {
                  setDisplayComponent("lostPassword");
                }}
              >
                Lost password ?
              </span>
              <span
                className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer"
                onClick={() => {
                  setDisplayComponent("signUp");
                }}
              >
                Create an account
              </span>
              <span
                className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer"
                onClick={() => {
                  navigate("/legal-mention");
                }}
              >
                Legal Mention
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{isLogged ? <AppWelcomePage/> : getComponent()}</>;
}

export default Welcome;
