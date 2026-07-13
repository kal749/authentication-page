import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  const [signupPhonenumber, setSignupPhonenumber] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupResult, setSignupResult] = useState("");

  if (!signupEmail.includes("@")) {
    alert("Invalid email");
    return;
  }
  if (password.length < 6) {
    alert("password must be at least 6 characters");
  }
}

function login() {
  fetch(
    `http://localhost:3000/login?phonenumber=${phonenumber}&password=${password}`,
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setUsers(json);
    });
}

function signup() {
  fetch(
    `http://localhost:3000/signup?phonenumber=${signupPhonenumber}&name=${signupName}&email=${signupEmail}&password=${signupPassword}`,
  )
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
      setSignupResult(text);
    });
}

return (
  <>
    <h1>login</h1>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
      action="/signup"
      method="get"
    >
      <input
        onChange={(value) => setPhonenumber(value.target.value)}
        type="text"
        name=""
        id=""
        placeholder="phonenumber"
      />
      <input
        onChange={(value) => setPassword(value.target.value)}
        type="password"
        name=""
        id=""
        placeholder="password"
      />

      <button>Login</button>

      {JSON.stringify(users)}
    </form>

    <h1>signup</h1>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signup();
      }}
    >
      <input
        onChange={(value) => setSignupName(value.target.value)}
        type="text"
        placeholder="name"
      />
      <input
        onChange={(value) => setSignupEmail(value.target.value)}
        type="text"
        placeholder="email"
      />
      <input
        onChange={(value) => setSignupPhonenumber(value.target.value)}
        type="text"
        placeholder="phonenumber"
      />
      <input
        onChange={(value) => setSignupPassword(value.target.value)}
        type="password"
        placeholder="password"
      />

      <button>Sign up</button>

      {signupResult}
    </form>
  </>
);

export default App;
