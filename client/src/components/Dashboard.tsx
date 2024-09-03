import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import DashboardPlayer from "./DashboardPlayer";

const DashboardExplorer = () => {
  return <section className="dashboard-explorer"></section>;
};

const Dashboard = () => {
  return (
    <main className="dashboard">
      <div className="dashboard__profile"></div>
      <DashboardNav />
      <DashboardExplorer />
      <DashboardPlayer />
      <Outlet />
    </main>
  );
};

export default Dashboard;
