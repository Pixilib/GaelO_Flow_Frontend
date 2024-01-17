import { useDispatch } from "react-redux";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SignInForm } from "./auth/SignInForm";
import { useCustomMutation } from "./utils/reactQuery";
import { signIn } from "./services/auth";
import { jwtDecode } from "jwt-decode";
import { login } from "./reducers/UserSlice";
import { toastError } from "./utils/toastify";
import { getUsers } from "./services/users";
import { SignUpForm } from "./auth/SignUpForm";
import { LostPasswordForm } from "./auth/LostPasswordForm";

import SignInImage from './assets/sign-in.svg?react'
import SignUpImage from './assets/sign-up.svg?react'

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

  const getImage = () => {
    switch (location.pathname) {
      case "/sign-in":
        return <SignInImage />

      case "/sign-up":
        return <SignUpImage />

      default:
        return <SignInImage />
    }
  }


  const loginHandle = (username: string, password: string) => {
    loginMutation.mutate({ username, password });
  };

  return (
    <>
<main className="h-screen w-screen sm:flex columns-2 gap-0 bg-gradient-to-r 
  from-primary 
  to-secondary ">

    <section className="h-full flex relative w-full">
          <img
            src="/gaelo-flow-white2.svg"
            className="absolute top-7 left-7 w-1/12 "
          ></img>
          <div className="flex h-screen justify-center items-center w-full">
            {getImage()}
          </div>
        </section>
        <section
          className="w-full flex justify-center items-center bg-white rounded-tl-70"
         style={{ filter: "drop-shadow(-17px 0 10px rgba(91, 84, 84, 0.4))" }}>
  {/* Contenu de la section */}
          <div className="w-2/3">
            <Routes>
              <Route path="/" element={<SignInForm onLogin={loginHandle} />} />
              <Route path="lost-password" element={<LostPasswordForm />} />
              <Route path="legal-mention" element={<div>Legal Mention</div>} />
              <Route path="sign-up" element={<SignUpForm />} />
            </Routes>
            <hr className="my-10 border-primary" />
            <div className="flex justify-between text-center mx-auto text-balance">


              {location.pathname !== "/sign-up" && (
                <span
                onClick={() => navigate("/sign-up")}
                className="text-gray-600 hover:underline hover:text-indigo-800 cursor-pointer"
              >
                Don’t have an account? <span className="text-primary">Sign Up</span>
              </span>
            )}

              {location.pathname !== "/" && (
                <span
                  onClick={() => navigate("/")}
                  className="text-gray-600 hover:underline hover:text-indigo-800 cursor-pointer"
                >
                  Login to your account
                </span>
              )}

              <span
                className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer"
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
