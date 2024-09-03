import { Outlet } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import DashboardNav from "./DashboardNav";
import DashboardPlayer from "./DashboardPlayer";

const DashboardExplorer = () => {
  return <section className="dashboard-explorer"></section>;
};

const Dashboard = () => {
  return (
    <main className="dashboard">
      <nav className="dashboard__secondary-nav">
        <p className="dashboard__secondary-nav-greeting">Good evening</p>
        <FaCog />
        <div className="dashboard__secondary-nav-profile" />
      </nav>
      <DashboardNav />
      <DashboardExplorer />
      <DashboardPlayer />
      <Outlet />
    </main>
  );
};

export default Dashboard;
