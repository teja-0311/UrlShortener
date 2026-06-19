import React, { useState } from 'react';
function UrlCard({ url, onDelete ,onEdit}) {
    return (
        

        <div className="border p-4 bg-amber-300 rounded shadow mb-4">

            <p className="font-semibold">
                Original URL
            </p>

            <a
                href={url.originalurl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 break-all"
            >
                {url.originalurl}
            </a>

            <p className="font-semibold mt-3">
                Short URL
            </p>
            
            <a
                href={url.shorturl}
                target="_blank"
                rel="noreferrer"
                className="text-green-600 break-all"
            >
                {url.shorturl}
            </a>
            <p className="text-sm text-gray-500 mt-2">
                Clicks : {url.clicks}
            </p>
            <p className="text-sm text-gray-500 mt-2">
               Last Visited: {
    url.lastVisited
        ? new Date(url.lastVisited).toLocaleString()
        : "Never"
}
            </p>
            <button
                onClick={() => {onDelete(url.id) , fetchUrls()}}
                className="bg-red-500 text-white px-3 py-2  rounded mt-2"
            >
                Delete
            </button>
            <button
                onClick={() => {onEdit(url.shorturl) , fetchUrls()}}
                className="bg-red-500 text-white px-3 py-2  rounded mt-2"
            >
                Edit
            </button>

        </div>

    );
}

export default UrlCard;