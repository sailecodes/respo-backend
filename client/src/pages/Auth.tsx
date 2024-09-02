import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AuthFormInput from "../components/AuthFormInput";
import { UserContext } from "../utils/contexts/UserContext";
import { loginUser } from "../utils/queries/loginUser";
import { registerUser } from "../utils/queries/registerUser";

const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(false);

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [register, { loading: registerLoading }] = useMutation(registerUser, {
    onCompleted: () => {
      setPassword("");
      setIsRegisterPage(false);
    },
    onError: (err) => console.log(err.graphQLErrors), // TODO:
  });

  const [login, { loading: loginLoading }] = useMutation(loginUser, {
    onCompleted: ({ data: { id, username } }) => {
      if (!user) {
        setUser!({ id, username });
        navigate("/dashboard");
      }
    },
    onError: (err) => console.log(err.graphQLErrors), // TODO:
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegisterPage) register({ variables: { username, email, password } });
    else login({ variables: { username, password } });
  };

  const handleRedirect = () => {
    setIsRegisterPage(!isRegisterPage);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleTestDrive = () => login({ variables: { username: "test@gmail.com", password: "test" } });

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
          />
          {isRegisterPage && (
            <AuthFormInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          )}
          <AuthFormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
