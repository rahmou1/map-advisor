import "./register.css";
import PlaceIcon from "@mui/icons-material/Place";
import { useState, useRef } from "react";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <PlaceIcon />
        RahmouPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" required ref={nameRef} />
        <input type="email" placeholder="email" required ref={emailRef} />
        <input
          type="password"
          placeholder="password"
          required
          ref={passwordRef}
        />
        <button className="registerBtn">Register</button>
        {success && (
          <span className="success">Account created successfully</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CancelIcon
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
