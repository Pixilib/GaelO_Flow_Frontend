import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SignInForm } from "./auth/SignInForm";
import { useCustomMutation } from "./utils/reactQuery";
import { signIn } from "./services/auth";
import { jwtDecode } from "jwt-decode";
import { login } from "./reducers/UserSlice";
import { toastError } from "./utils/toastify";

function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <Routes>
              <Route path="/*" element={<SignInForm onLogin={loginHandle} />} />
              <Route path="lost-password" element={<div>Lost Password</div>} />
              <Route path="legal-mention" element={<div>Legal Mention</div>} />
            </Routes>
            <hr className="my-10 border-orange-300" />
            <div className="flex justify-between">
              <span
                className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer"
                onClick={() => {
                  navigate("/lost-password");
                }}
              >
                Lost password ?
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
    </>
  );
}

export default Welcome;
