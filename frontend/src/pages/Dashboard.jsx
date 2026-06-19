import { useEffect, useState } from "react";
import api from "../services/api";
import UrlCard from "../components/UrlCard";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [urls, setUrls] = useState([]);
    const [originalurl, setOriginalurl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {

        try {

            const res = await api.get("/urls/myurls");

            console.log("FETCH RESPONSE:", res.data);

            setUrls(res.data.urls);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };


    const createUrl = async () => {

        if (!originalurl.trim()) {
            alert("Please enter a URL");
            return;
        }

        try {

            const res = await api.post("/urls", {
                originalurl
            });

            console.log("CREATE RESPONSE:", res.data);

            setUrls(prev => [
                res.data.url,
                ...prev
            ]);

            setOriginalurl("");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Failed to create URL"
            );

        }
    };

    const editUrl = async (shorturl) => {

    const newAlias =
        prompt("Enter new alias:");

    if (!newAlias?.trim()) {
        alert("Alias is required");
        return;
    }

    try {

        await api.put(
            `/urls/edit/${shorturl.split("/").pop()}`,
            {
                newAlias
            }
        );

        await fetchUrls();

        alert("Updated successfully");

    } catch (err) {

        console.log(err);

        alert(
            err.response?.data?.message ||
            "Failed to update URL"
        );

    }
};

    const deleteUrl = async (id) => {

        try {

            await api.delete(`/urls/${id}`);

            setUrls(
                urls.filter(
                    (url) => url.id !== id
                )
            );

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Failed to delete URL"
            );

        }
    };

    if (loading) {

        return (
            <h1 className="text-center mt-10 text-2xl">
                Loading...
            </h1>
        );

    }

    return (
        <>
            <Navbar />

            <div className="max-w-4xl mx-auto p-6 ">

                <h1 className="text-3xl font-bold mb-6">
                    Dashboard
                </h1>

                <div className="flex gap-3 mb-6">

                    <input
                        type="text"
                        className="border p-3 flex-1 rounded"
                        placeholder="Enter URL (https://google.com)"
                        value={originalurl}
                        onChange={(e) =>
                            setOriginalurl(e.target.value)
                        }
                    />

                    <button
                        onClick={createUrl}
                        className="bg-blue-500 text-white px-5 py-3 rounded"
                    >
                        Shorten
                    </button>

                </div>

                {
                    (urls.length!==0)?([...urls]
                    .sort(
                        (a, b) =>
                        new Date(b.lastVisited || 0) -
                        new Date(a.lastVisited || 0)
                    )
                    .map((url) => (
                        <UrlCard
                        key={url.id}
                        url={url}
                        onDelete={deleteUrl}
                        onEdit={editUrl}
                        />
                    ))):(
                        <h1 className="text-center mt-10 text-2xl text-gray-700">
                            No URLs found. Create one!
                        </h1>
                    )
                }
            </div>
        </>
    );
}

export default Dashboard;