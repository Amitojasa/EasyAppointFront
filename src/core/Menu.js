import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname == path) {
    return { color: "#28a745" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              DashBoard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/manager/dashboard")}
              className="nav-link"
              to="/manager/dashboard"
            >
              Manager DashBoard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 2 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/doctor/dashboard")}
              className="nav-link"
              to="/doctor/dashboard"
            >
              Doctor DashBoard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 3 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/manager/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Admin DashBoard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign in
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              style={currentTab(history, "/signout")}
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
export default withRouter(Menu);