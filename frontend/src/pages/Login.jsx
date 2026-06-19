import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/users/login", {
                email,
                password
            });

            alert(res.data.message);

            navigate("/dashboard");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="flex justify-center items-center h-screen bg-amber-200">

            <form
                onSubmit={handleSubmit}
                className="w-96 p-8 shadow-lg rounded-lg  bg-gradient-to-r from-amber-500 to-green-500"
            >
                 <h1 className="text-3xl mb-6 text-center font-bold text-indigo-950">
                    URL Shortener
                </h1>
                <h1 className="text-3xl mb-6 font-semibold text-center">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-4"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="bg-green-800 text-white p-2 rounded w-full"
                >
                    Login
                </button>

                <p className="mt-4">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-red-500 ml-2 font-bold"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>

    );
}

export default Login;