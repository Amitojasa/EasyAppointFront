import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper/index'
import { Link } from "react-router-dom";


const UserDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();



  return (
    <Base title="User Dashboard">
      <h1>This is User Dashboard</h1>
      <ul>
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

      </ul>
    </Base>
  );
};

export default UserDashboard;
