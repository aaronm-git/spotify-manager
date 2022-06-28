import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-white py-5 text-center">
      <h1 className="text-primary display-1">
        <strong>404</strong>
      </h1>
      <p>Page Not Found</p>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default NotFoundPage;
