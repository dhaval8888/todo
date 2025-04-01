import React from "react";
export default function PageNotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Oops! The page you are looking for does not exist.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    );
  }