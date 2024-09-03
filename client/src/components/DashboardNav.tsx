import { NavLink } from "react-router-dom";
import { GoSearch, GoHome, GoVersions } from "react-icons/go";

const DashboardNav = () => {
  return (
    <nav className="dashboard-nav">
      <NavLink to="/dashboard" end>
        <GoHome />
        <p>Home</p>
      </NavLink>
      <NavLink to="/dashboard/search">
        <GoSearch />
        <p>Search</p>
      </NavLink>
      <NavLink to="/dashboard/library">
        <GoVersions />
        <p>Your Library</p>
      </NavLink>
    </nav>
  );
};

export default DashboardNav;
