import { useState } from "react";

// Public
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// App
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Alerts from "./pages/Alerts";
import News from "./pages/News";
import Profile from "./pages/Profile";

import Layout from "./components/Layout";

export default function App() {
  const [page, setPage] = useState("landing");

  if (page === "landing") return <Landing go={setPage} />;
  if (page === "login") return <Login go={setPage} />;
  if (page === "signup") return <Signup go={setPage} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "portfolio":
        return <Portfolio />;
      case "alerts":
        return <Alerts />;
      case "news":
        return <News />;
      case "profile":
        return <Profile go={setPage} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout setPage={setPage}>
      {renderPage()}
    </Layout>
  );
}