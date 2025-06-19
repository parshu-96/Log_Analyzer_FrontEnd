import { useNavigate } from "react-router-dom";

const HomePage = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setUserRole(role);
    if (role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-gray-950 text-white px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-blue-400">
          🔍 Log Analyzer
        </h1>
        <p className="text-gray-400 mb-10">
          Select your role to continue and manage or analyze logs efficiently.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogin("user")}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition duration-200"
          >
            Login as User
          </button>
          <button
            onClick={() => handleLogin("admin")}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition duration-200"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
