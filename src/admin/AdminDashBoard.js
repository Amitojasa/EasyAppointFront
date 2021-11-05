import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();



  return (
    <Base
      title="Admin Dashboard"
      description="Manage all your products here"
      className="container bg-success p-4"
    >

    </Base>
  );
};

export default AdminDashboard;