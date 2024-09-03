import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import AuthFormInput from "../components/AuthFormInput";
import { UserContext } from "../utils/contexts/UserContext";
import { loginUser } from "../utils/queries/loginUser";
import { registerUser } from "../utils/queries/registerUser";
import { findErrors } from "../utils/errors/findErrors";
import {
  EMAIL_NOT_EMAIL_TOAST_MSG,
  PASSWORD_INCORRECT_TOAST_MSG,
  PASSWORD_LENGTH_TOAST_MSG,
  PASSWORD_NONEMPTY_TOAST_MSG,
  USER_DNE_TOAST_MSG,
  USERNAME_LENGTH_TOAST_MSG,
  USERNAME_NONEMPTY_TOAST_MSG,
} from "../utils/constants";

/*

TODO:

Fix toast issue where user provides valid username and invalid password,
then provides an invalid username while maintaining the password, which leaves
an error message for both username and password. Desired functionality is only
the username should display an error message

TODO:

Use `user` variable to check if the user is already logged in...maybe even use
the `sid` cookie to prevent double login

*/
const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameHasError, setUsernameHasError] = useState<boolean>(false);
  const [emailHasError, setEmailHasError] = useState<boolean>(false);
  const [passwordHasError, setPasswordHasError] = useState<boolean>(false);
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);

  const { user, setUser } = useContext(UserContext); // TODO:

  const navigate = useNavigate();

  useEffect(() => toast.dismiss(), []);

  const [register, { loading: registerLoading }] = useMutation(registerUser, {
    onCompleted: () => {
      setPassword("");
      setIsRegisterPage(false);
    },
    onError: (err) => {
      const { rerrs, affected } = findErrors(err);

      rerrs.forEach((e) => toast.error(e, { toastId: e, containerId: "tc", autoClose: false }));

      setUsernameHasError(affected.username);
      setEmailHasError(affected.email);
      setPasswordHasError(affected.password);
    },
  });

  const [login, { loading: loginLoading }] = useMutation(loginUser, {
    onCompleted: ({ data: { id, username } }) => {
      toast.dismiss();
      toast.success("Welcome back, music lovers.", { toastId: "toastLoginId", containerId: "tc" });

      setUser!({ id, username });
      navigate("/dashboard");
    },
    onError: (err) => {
      const { rerrs, affected } = findErrors(err);

      rerrs.forEach((e) => toast.error(e, { toastId: e, containerId: "tc", autoClose: false }));

      setUsernameHasError(affected.username);
      setPasswordHasError(affected.password);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegisterPage) register({ variables: { username, email, password } });
    else login({ variables: { username, password } });
  };

  const handleRedirect = () => {
    toast.dismiss();

    setIsRegisterPage(!isRegisterPage);

    setUsername("");
    setEmail("");
    setPassword("");

    setUsernameHasError(false);
    setEmailHasError(false);
    setPasswordHasError(false);
  };

  const handleTestDrive = () => login({ variables: { username: "test", password: "testuseronly" } });

  return (
    <main className="auth">
      <section>
        <header>Respo</header>
        <p className="auth--subheader">A Spotify-wannabe-clone.</p>
        <form className="auth--form" onSubmit={handleSubmit}>
          <AuthFormInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              toast.dismiss({ id: USER_DNE_TOAST_MSG, containerId: "tc" });
              toast.dismiss({ id: USERNAME_LENGTH_TOAST_MSG, containerId: "tc" });
              toast.dismiss({ id: USERNAME_NONEMPTY_TOAST_MSG, containerId: "tc" });

              setUsername(e.target.value);
              setUsernameHasError(false);
            }}
            hasErr={usernameHasError}
          />
          {isRegisterPage && (
            <AuthFormInput
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                toast.dismiss({ id: EMAIL_NOT_EMAIL_TOAST_MSG, containerId: "tc" });

                setEmail(e.target.value);
                setEmailHasError(false);
              }}
              hasErr={emailHasError}
            />
          )}
          <AuthFormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              toast.dismiss({ id: PASSWORD_INCORRECT_TOAST_MSG, containerId: "tc" });
              toast.dismiss({ id: PASSWORD_LENGTH_TOAST_MSG, containerId: "tc" });
              toast.dismiss({ id: PASSWORD_NONEMPTY_TOAST_MSG, containerId: "tc" });

              setPassword(e.target.value);
              setPasswordHasError(false);
            }}
            hasErr={passwordHasError}
          />
          <button>
            <ScaleLoader loading={registerLoading || loginLoading} height={10} color={"#222831"} />
            {!registerLoading && !loginLoading && isRegisterPage ? "Register" : "Login"}
          </button>
        </form>
        <p className="auth--redirect">
          {isRegisterPage ? "Already have an account? " : "Not yet registered? "}
          <span onClick={handleRedirect}>{isRegisterPage ? "Sign in" : "Register"}</span>
        </p>
        <div className="auth--test">
          <p>Here to test the app?</p>
          <button onClick={handleTestDrive}>Test drive</button>
        </div>
      </section>
    </main>
  );
};

export default Auth;
