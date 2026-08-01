import "./auth.css";
import { useState } from "react";

export default function Signup({ go }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://13.233.88.91:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      go("login");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-title">Create Account</div>
        <div className="auth-sub">
          Start your StockPulse journey
        </div>

        <div className="input-group">
          <label>Name</label>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={handleSignup}>
          Create Account
        </button>

        <div className="switch">
          Already have an account?{" "}
          <span onClick={() => go("login")}>Sign in</span>
        </div>

      </div>
    </div>
  );
}