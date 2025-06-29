import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import csrfAxios from '../api/csrfAxios';

export default function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
    errorMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      setState((prev) => ({
        ...prev,
        errorMessage: "Passwords do not match",
        successMessage: null,
      }));
      return;
    }

    try {
      await csrfAxios.get('/sanctum/csrf-cookie');
           
      const res = await api.post("/register", {
        name: state.userName,
        email: state.email,
        password: state.password,
        password_confirmation: state.confirmPassword,
      });

      localStorage.setItem("token", res.data.token);

      setState((prev) => ({
        ...prev,
        successMessage: "Registration successful!",
        errorMessage: null,
      }));

      // Redirect after short delay
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      let message = "Registration failed. Please try again.";
      if (error.response && error.response.data?.message) {
        message = error.response.data.message;
      }

      setState((prev) => ({
        ...prev,
        errorMessage: message,
        successMessage: null,
      }));
    }
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-4 m-auto">
      <form onSubmit={register}>
        <div className="form-group text-left">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            placeholder="Enter name"
            value={state.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group text-left mt-2">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group text-left mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group text-left mt-2">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">
          Register
        </button>
      </form>

      {state.successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {state.successMessage}
        </div>
      )}
      {state.errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {state.errorMessage}
        </div>
      )}

      <div className="mt-3 text-center">
        <span>Already have an account? </span>
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </div>
    </div>
  );
}
