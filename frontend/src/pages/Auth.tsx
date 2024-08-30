import { useState } from "react";

const Auth = () => {
  const [isRegisterPage, setIsRegisterPage] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("User registering or logging in...");
  };

  const handleTestDrive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("User is test driving...");
  };

  return (
    <main className="auth">
      <section>
        <header>Respo</header>
        <p className="auth--subheader">A Spotify-wannabe-clone.</p>
        <form className="auth--form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          {isRegisterPage && <input type="email" placeholder="Email" />}
          <input type="password" placeholder="Password" />
          <button>{isRegisterPage ? "Register" : "Login"}</button>
        </form>
        <p className="auth--redirect">
          {isRegisterPage ? "Already have an account? " : "Not yet registered? "}
          <span onClick={() => setIsRegisterPage(!isRegisterPage)}>{isRegisterPage ? "Sign in" : "Register"}</span>
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
