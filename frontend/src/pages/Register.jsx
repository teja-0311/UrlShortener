import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/users/register", {
                name,
                email,
                password
            });

            alert(res.data.message);

            navigate("/");

        }

        catch (err) {

            alert(err.response.data.message);

        }

    };

    return (

        <div className="flex justify-center items-center h-screen bg-amber-200">

            <form
                onSubmit={handleSubmit}
                className="w-96 p-8 shadow-lg rounded-lg bg-gradient-to-r from-amber-500 to-green-500"
            >
                <h1 className="text-3xl mb-6 text-center font-bold text-indigo-950 ">
                    URL Shortener
                </h1>
                <h1 className="text-3xl mb-6 font-semibold text-center">
                    Register
                </h1>

                <input
                    className="border p-2 w-full mb-4"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    className="border p-2 w-full mb-4"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    className="border p-2 w-full mb-4"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Register
                </button>

                <p className="mt-4">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-indigo-800 font-semibold ml-2"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Register;