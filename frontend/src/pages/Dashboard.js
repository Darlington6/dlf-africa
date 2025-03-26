import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/courses">Enroll in a Course</Link>
      <Link to="/mentorship">Request Mentorship</Link>
    </div>
  );
};

export default Dashboard;
