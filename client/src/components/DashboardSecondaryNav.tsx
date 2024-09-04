import { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaCog } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";

const DashboardSecondaryNav = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <nav className="dashboard-secondary-nav">
      <div className="dashboard-secondary-nav__left">
        <Link to="/dashboard" className="dashboard-secondary-nav__left-home-link">
          <GoHomeFill className="dashboard-secondary-nav__left-home-link-icon" />
        </Link>
        <p className="dashboard-secondary-nav__left-greeting">Good evening</p>
      </div>
      <div className="dashboard-secondary-nav__search">
        <div>
          <CiSearch className="dashboard-secondary-nav__search-icon" />
        </div>
        <input
          type="text"
          placeholder="What do you want to play?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="dashboard-secondary-nav__links">
        <Link to="/dashboard/account" className="dashboard-secondary-nav__links-account">
          <div className="dashboard-secondary-nav__account-img" />
        </Link>
        <Link to="/dashboard/settings" className="dashboard-secondary-nav__links-settings">
          <FaCog className="dashboard-secondary-nav__links-settings-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default DashboardSecondaryNav;
