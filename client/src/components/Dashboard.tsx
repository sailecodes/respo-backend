import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import DashboardPlayer from "./DashboardPlayer";
import DashboardSecondaryNav from "./DashboardSecondaryNav";

const DashboardExplorer = () => {
  return <section className="dashboard-explorer"></section>;
};

const Dashboard = () => {
  return (
    <section className="dashboard">
      <DashboardNav />
      <DashboardSecondaryNav />
      <DashboardExplorer />
      <DashboardPlayer />
      <Outlet />
    </section>
  );
};

export default Dashboard;
