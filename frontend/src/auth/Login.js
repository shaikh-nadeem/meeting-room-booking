import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import csrfAxios from '../api/csrfAxios';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })

    useEffect(() => {
        if (!loading && user) {
            navigate("/dashboard");
        }
    }, [loading, user, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }


    const login = async (e) => {
        e.preventDefault();

        try {
            await csrfAxios.get("/sanctum/csrf-cookie");

            const res = await api.post("/login", {
                email: state.email,
                password: state.password,
            });

            localStorage.setItem("token", res.data.token);
            
            setState((prevState) => ({
                ...prevState,
                successMessage: "Login successful!",
                errorMessage: null,
            }));

            // Wait 1 second before redirect
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (error) {
            if (error.response?.status === 422) {
                const emailError = error.response.data.errors?.email?.[0] || "Login failed";
                setState((prevState) => ({
                    ...prevState,
                    errorMessage: emailError,
                    successMessage: null,
                }));
            } else if (error.response?.status === 429) {
                setState((prevState) => ({
                    ...prevState,
                    errorMessage: "Too many login attempts. Please try again later.",
                    successMessage: null,
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    errorMessage: "Something went wrong. Please try again.",
                    successMessage: null,
                }));
            }
        }
    };


    const redirectToRegister = () => {
        navigate("/register");
    };


    return (
        <>

            <div className="card col-12 col-lg-4 login-card mt-2 hv-center m-auto">
                <form onSubmit={login}>
                    <div className="form-group text-left">
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
                        <small className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
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
                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                </form>

                {state.successMessage && (
                    <div className="alert alert-success mt-2" role="alert">
                        {state.successMessage}
                    </div>
                )}
                {state.errorMessage && (
                    <div className="alert alert-danger mt-2" role="alert">
                        {state.errorMessage}
                    </div>
                )}

                <div className="registerMessage mt-3 text-center">
                    <span>Don't have an account? </span>
                    <span className="loginText text-primary" onClick={redirectToRegister} style={{ cursor: 'pointer' }}>
                        Register
                    </span>
                </div>
            </div>
        </>
    )
}