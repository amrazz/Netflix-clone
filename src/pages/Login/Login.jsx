import "./Login.css";
import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

function Login() {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      if (error.message.includes("Email already in use")) {
        setSignState("Sign In");
      }
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <img src={Logo} alt="Logo" className="login-logo" />
      <div className="login-form">
        <form onSubmit={user_auth}>
          <h1>{signState}</h1>
          {signState !== "Sign In" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={user_auth}
            type="submit"
            disabled={!password || !email}
            style={{backgroundColor : !password || !email ? 'brown' : 'red'}}
          >
            {loading ? (
              <div className="login-spinner">
                <img src={netflix_spinner} alt="Loading..." />
              </div>
            ) : (
              signState
            )}
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="remember" />
              <label>Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState !== "Sign In" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          ) : (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
