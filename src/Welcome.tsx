import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SignInForm } from "./auth/SignInForm";
import { useCustomMutation } from "./utils/reactQuery";
import { lostPassword, signIn } from "./services/auth";
import { jwtDecode } from "jwt-decode";
import { login } from "./reducers/UserSlice";
import { toastError } from "./utils/toastify";
import { getUsers } from "./services/users";
import { SignUpForm } from "./auth/SignUpForm";
import { LostPasswordForm } from "./auth/LostPasswordForm";

import SignInImage from "./assets/sign-in.svg?react";
import SignUpImage from "./assets/sign-up.svg?react";

function Welcome() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loginMutation = useCustomMutation(
    ({ username, password }) => signIn(username, password),
    null,
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        const decodedToken: Record<string, any> = jwtDecode(
          data.data.access_token
        );
        dispatch(
          login({
            token: data.data.access_token,
            userId: decodedToken.userId,
            role: decodedToken.role,
          })
        );
        getUsers().then((response) => console.log(response.data));
      },
      onError: () => {
        toastError("Error in creadentials");
      },
    }
  );

  const loginHandle = (username: string, password: string) => {
    loginMutation.mutate({ username, password });
  };

  const changePasswordMutation = useCustomMutation(
    ({ email }) => lostPassword(email),
    null,
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        console.log(data);
      },
      onError: () => {
        toastError("Error in creadentials");
      },
    }
  );

  const changePasswordHandle = (email: string) => {
    changePasswordMutation.mutate({ email });
  };

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


  return (
    <>
      <main className="w-screen h-screen gap-0 sm:flex columns-2 bg-gradient-to-r from-primary to-secondary">
        <section className="relative flex w-full h-full">
          <img
            src="/gaelo-flow-white2.svg"
            className="absolute top-7 left-7"
            alt="Logo"
            style={{ width: '8.33%', maxWidth: '100%', height: 'auto' }}
          />
          <div className="flex items-center justify-center w-full h-screen">
            {getImage()}
          </div>
        </section>
        <section
          className="flex items-center justify-center w-full bg-white rounded-tl-70"
          style={{ filter: "drop-shadow(-17px 0 10px rgba(91, 84, 84, 0.4))" }}>
          {/* Contenu de la section */}
          <div className="w-2/3">
            <Routes>
              <Route path="/" element={<SignInForm onLogin={loginHandle} />} />
              <Route path="lost-password" element={<LostPasswordForm onSubmit={changePasswordHandle} />} />
              <Route path="legal-mention" element={<div>Legal Mention</div>} />
              <Route path="sign-up" element={<SignUpForm />} />
            </Routes>
            <hr className="my-8 mt-20 border-primary" />
            <div className="flex justify-between mx-auto text-center text-balance">
              {location.pathname !== "/sign-up" && (
                <span
                  onClick={() => navigate("/sign-up")}
                  className="text-gray-600 cursor-pointer hover:underline hover:text-indigo-800"
                >
                  Don’t have an account? <span className="text-primary">Sign Up</span>
                </span>
              )}

              {location.pathname !== "/" && (
                <span
                  onClick={() => navigate("/")}
                  className="text-gray-600 cursor-pointer hover:underline hover:text-indigo-800"
                >
                  Already have an account ? <span className="text-primary">Login</span>                </span>
              )}

              <span
                className="inline-block text-gray-600 cursor-pointer hover:underline hover:text-indigo-800"
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
}

export default Welcome;
