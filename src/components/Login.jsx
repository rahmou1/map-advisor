import "./login.css";
import PlaceIcon from "@mui/icons-material/Place";
import { useState, useRef } from "react";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();

  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        "https://maptravelworld.onrender.com/api/users/login",
        user
      );

      myStorage.setItem("user", res.data.message.username);
      setCurrentUser(res.data.message.username);
      setShowLogin(false);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <PlaceIcon />
        RahmouPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" required ref={nameRef} />

        <input
          type="password"
          placeholder="password"
          required
          ref={passwordRef}
        />
        <button className="loginBtn">Login</button>

        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CancelIcon className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
