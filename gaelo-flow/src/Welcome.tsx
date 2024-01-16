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
import { ImgChangeWelcome } from "./RenderComponents/ImgChangeWelcome";

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

  return (
    <>
      <main className="h-screen w-screen sm:flex columns-2 gap-0 bg-gradient-to-r from-indigo-700 to-amber-500">
        <section className="h-full flex relative w-full">
          <img
            src="/gaelo-flow-white2.svg"
            className="absolute top-7 left-7 w-1/12 "
          ></img>
          <div className="flex h-screen justify-center w-full">
            <ImgChangeWelcome/>
          </div>
        </section>
        <section
          className="w-full flex justify-center items-center bg-white rounded-tl-3xl"
          style={{ filter: "drop-shadow(-20px 0 20px rgba(50, 50, 50, 0.5))" }}
        >
          <div className="w-2/3">
            <Routes>
              <Route path="/" element={<SignInForm onLogin={loginHandle} />} />
              <Route path="lost-password" element={ <LostPasswordForm/> } />
              <Route path="legal-mention" element={<div>Legal Mention</div>} />
              <Route path="sign-up" element={<SignUpForm />} />
            </Routes>
            <hr className="my-10 border-orange-300" />
            <div className="flex justify-between text-center mx-auto text-balance">
              <span
                className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer"
                onClick={() => navigate("/lost-password")}
              >
                Lost password ?
              </span>

              {location.pathname !== "/sign-up" && (
                <span
                  onClick={() => navigate("/sign-up")}
                  className="text-gray-600 hover:underline hover:text-indigo-800 cursor-pointer"
                >
                  Create your account
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
