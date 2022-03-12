import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper/index'
import { Link } from "react-router-dom";
import '../core/user.css'

const UserDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();



  return (
    <Base title="User Dashboard">
      <ul className="user-menu">
        <li className="nav-item">
          <Link


            to="/user/managepatients"
          >
            Manage patients
          </Link>
        </li>
        <li className="nav-item">
          <Link
            // className="dashboard-dash-dlink dashboard-dash-cursor"

            to={{
              pathname: "/user/addpatient",
            }}
          >
            Add Patient
          </Link>
        </li>
        <li className="nav-item">
          <Link
            // className="dashboard-dash-dlink dashboard-dash-cursor"

            to={{
              pathname: "/user/bookTest",
            }}
          >
            Book Test
          </Link>
        </li>

      </ul>
    </Base>
  );
};

export default UserDashboard;
