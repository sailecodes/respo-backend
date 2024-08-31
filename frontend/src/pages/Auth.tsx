import { useContext, useState } from "react";
import { UserContext } from "../utils/contexts/UserContext";

const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(true);

  const { register, login } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegisterPage) register.mutate!({ variables: { username, email, password } });
    else login.mutate!({ variables: { username, password } });
  };

  const handleRedirect = () => {
    setIsRegisterPage(!isRegisterPage);
    // setUsername("BRUH");
    // setEmail("");
    // setPassword("");
    // ??
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
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          {isRegisterPage && <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />}
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
