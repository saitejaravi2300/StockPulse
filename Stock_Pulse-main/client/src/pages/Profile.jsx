import { useEffect, useState } from "react";
import "./profile.css";

export default function Profile({ go }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://13.233.88.91:3000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user || data);   // important fix
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    go("login");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h1 className="profile-name">{user?.name || "User Name"}</h1>
        <p className="profile-email">{user?.email}</p>

        <div className="profile-info">
          <div className="info-row">
            <span>User ID</span>
            <strong>{user?.id}</strong>
          </div>

          <div className="info-row">
            <span>Account Type</span>
            <strong>Investor</strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <strong>Active</strong>
          </div>
        </div>

        <div className="btn-group">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>

          <button className="back-btn" onClick={() => go("dashboard")}>
            Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}