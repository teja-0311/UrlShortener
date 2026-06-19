import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {

    const navigate = useNavigate();

    const logout = async () => {

        try {

            await api.post("/users/logout");

            navigate("/");

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="bg-black text-white p-4 flex justify-between ">

            <h1>
                URL Shortener
            </h1>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-2 rounded"
            >
                Logout
            </button>

        </div>

    );
}

export default Navbar;