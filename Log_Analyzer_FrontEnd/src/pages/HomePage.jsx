// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-8">Log Analyzer</h1>
      <div className="space-y-4">
        <button
          onClick={() => navigate("/user")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login as User
        </button>
        <button
          onClick={() => navigate("/admin")}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default HomePage;
