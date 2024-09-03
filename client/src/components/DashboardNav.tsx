import { NavLink } from "react-router-dom";
import { GoSearch, GoHome, GoVersions } from "react-icons/go";

const DashboardNav = () => {
  return (
    <nav className="dashboard-nav">
      <NavLink to="/dashboard">
        <GoHome />
        <p>Home</p>
      </NavLink>
      <NavLink to="/dummy">
        <GoSearch />
        <p>Search</p>
      </NavLink>
      <NavLink to="/dummy2">
        <GoVersions />
        <p>Your Library</p>
      </NavLink>
    </nav>
  );
};

export default DashboardNav;
