import { useContext, useState } from "react";
import { UserContext } from "../utils/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(true);
  const { register, login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegisterPage) {
      register.mutate!({ variables: { username, email, password } });
    } else {
      login.mutate!({ variables: { username, password } });
      navigate("/dashboard");
    }
  };

  const handleRedirect = () => {
    setIsRegisterPage(!isRegisterPage);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleTestDrive = () => {
    login.mutate!({ variables: { username: "test@gmail.com", password: "test" } });
  };

  return (
    <main className="auth">
      <section>
        <header>Respo</header>
        <p className="auth--subheader">A Spotify-wannabe-clone.</p>
        <form className="auth--form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          {isRegisterPage && (
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          )}
          <input
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
