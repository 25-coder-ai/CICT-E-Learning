import { useState } from "react";

const textCls = "text-[#E8ECEF] [text-shadow:0_2px_8px_rgba(8,31,28,0.9),0_1px_3px_rgba(8,31,28,0.8)]";

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginSuccess?.();
  };

  return (
    <div className="mx-auto max-w-md" style={{ fontFamily: '"Tiro Tamil", serif' }}>
      <div className="rounded-2xl border border-[#E8ECEF]/30 bg-[#131936]/70 p-8 shadow-lg backdrop-blur-sm">
        <h3 className={`text-center text-2xl font-bold ${textCls}`}>Login</h3>
        <p className={`mt-1 text-center text-sm ${textCls}`}>
          Sign in to access Video Lectures
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className={`block text-sm font-semibold ${textCls}`}>
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#E8ECEF]/40 bg-white/90 px-3 py-2 text-[#131936] outline-none focus:border-[#E8ECEF] focus:ring-2 focus:ring-[#E8ECEF]/30"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-semibold ${textCls}`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#E8ECEF]/40 bg-white/90 px-3 py-2 text-[#131936] outline-none focus:border-[#E8ECEF] focus:ring-2 focus:ring-[#E8ECEF]/30"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#E8ECEF] py-2.5 text-sm font-semibold text-[#131936] transition-all duration-200 hover:bg-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
