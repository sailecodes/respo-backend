import { Link, Outlet } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import DashboardNav from "./DashboardNav";
import DashboardPlayer from "./DashboardPlayer";

const DashboardExplorer = () => {
  return <section className="dashboard-explorer"></section>;
};

const Dashboard = () => {
  return (
    <section className="dashboard">
      <nav className="dashboard__secondary-nav">
        <p className="dashboard__secondary-nav-greeting">Good evening</p>
        <Link to="/dashboard/account">
          <div className="dashboard__secondary-nav-profile" />
        </Link>
        <Link to="/dashboard/settings">
          <FaCog />
        </Link>
      </nav>
      <DashboardNav />
      <DashboardExplorer />
      <DashboardPlayer />
      <Outlet />
    </section>
  );
};

export default Dashboard;
