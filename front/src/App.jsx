import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

 const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);


  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhonenumber, setSignupPhonenumber] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupResult, setSignupResult] = useState("");

  function login() {
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    fetch(
      `http://localhost:${PORT}/api/login?phonenumber=${phonenumber}&password=${password}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUsers(json);
      })
      .catch((err) => console.log(err));
  }

  function signup() {
    if (!signupEmail.includes("@")) {
      alert("Invalid email");
      return;
    }

    if (signupPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    fetch(
      `http://localhost:${PORT}/api/signup?phonenumber=${signupPhonenumber}&name=${signupName}&email=${signupEmail}&password=${signupPassword}`
    )
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setSignupResult(text);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h1>Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <input
          type="text"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>{JSON.stringify(users)}</p>
      </form>

      <hr />

      <h1>Sign Up</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={signupName}
          onChange={(e) => setSignupName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={signupPhonenumber}
          onChange={(e) => setSignupPhonenumber(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>

        <p>{signupResult}</p>
      </form>
    </>
  );
}

export default App;