import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";

const DashboardExplorer = () => {
  return <section className="dashboard-explorer"></section>;
};

const DashboardPlayer = () => {
  return <section className="dashboard-player">Dashboard player</section>;
};

const Dashboard = () => {
  return (
    <main className="dashboard">
      <div className="dashboard__profile"></div>
      <DashboardNav />
      <DashboardExplorer />
      <Outlet />
      <DashboardPlayer />
    </main>
  );
};

export default Dashboard;
