import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const styletext = "btn btn-secondary btn-block"

  return (
    <Base
      title="Admin Dashboard"
      description="Manage all your products here"
      className="container bg-success p-4"
    >
      <ul className="list-group">
        <li className="nav-item list-group-item">
          <Link
            className={styletext}

            to="/admin/createuser"
          >
            Add Staff
          </Link>
        </li>
        <li className="nav-item list-group-item">
          <Link
            // className="dashboard-dash-dlink dashboard-dash-cursor"
            className={styletext}
            to={{
              pathname: "/admin/managestaff",

              state: { role: 2 }
            }}
          >
            Manage Doctors
          </Link>
        </li>
        <li className="nav-item list-group-item">
          <Link
            // className="dashboard-dash-dlink dashboard-dash-cursor"
            className={styletext}
            to={{
              pathname: "/admin/managestaff",

              state: { role: 1 }
            }}
          >
            Manage Managers
          </Link>
        </li>
        <li className="nav-item list-group-item">
          <Link
            // className="dashboard-dash-dlink dashboard-dash-cursor"
            className={styletext}
            to={{
              pathname: "/admin/managestaff",

              state: { role: 4 }
            }}
          >
            Manage Lab Attendants
          </Link>
        </li>
        <li className="nav-item list-group-item">
          <Link
            // className="dashboard-dash-dlink dashboard-dash-cursor"
            className={styletext}
            to={{
              pathname: "/admin/test/create",


            }}
          >
            Create Test
          </Link>
        </li>
        <li className="nav-item list-group-item">
          <Link
            // className="dashboard-dash-dlink dashboard-dash-cursor"
            className={styletext}
            to={{
              pathname: "/admin/managetests",


            }}
          >
            Manage Tests
          </Link>
        </li>
      </ul>
    </Base >
  );
};

export default AdminDashboard;
