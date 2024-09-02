import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthFormInput from "../components/AuthFormInput";
import { UserContext } from "../utils/contexts/UserContext";
import { loginUser } from "../utils/queries/loginUser";
import { registerUser } from "../utils/queries/registerUser";
import { findErrors } from "../utils/errors/findErrors";

const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameHasError, setUsernameHasError] = useState<boolean>(false);
  const [emailHasError, setEmailHasError] = useState<boolean>(false);
  const [passwordHasError, setPasswordHasError] = useState<boolean>(false);
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => toast.dismiss(), []);

  const [register, { loading: registerLoading }] = useMutation(registerUser, {
    onCompleted: () => {
      setPassword("");
      setIsRegisterPage(false);
    },
    onError: (err) => {
      const { rerrs, affected } = findErrors(err);

      rerrs.forEach((e) => toast.error(e, { toastId: e, autoClose: false }));

      setUsernameHasError(affected.username);
      setEmailHasError(affected.email);
      setPasswordHasError(affected.password);
    },
  });

  const [login, { loading: loginLoading }] = useMutation(loginUser, {
    onCompleted: ({ data: { id, username } }) => {
      toast.dismiss();
      toast.success("Welcome back, music lovers.", { toastId: "toastLoginId" });

      setUser!({ id, username });
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err.graphQLErrors);
      toast.error("Please double-check all credentials are correct.", { toastId: "toastLoginErrorId" });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegisterPage) register({ variables: { username, email, password } });
    else {
      login({ variables: { username, password } });
    }
  };

  const handleRedirect = () => {
    setIsRegisterPage(!isRegisterPage);
    setUsername("");
    setEmail("");
    setPassword("");
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
            onChange={(e) => setUsername(e.target.value)}
            hasErr={usernameHasError}
          />
          {isRegisterPage && (
            <AuthFormInput
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hasErr={emailHasError}
            />
          )}
          <AuthFormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasErr={passwordHasError}
          />
          <button>{isRegisterPage ? "Register" : "Login"}</button>
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
