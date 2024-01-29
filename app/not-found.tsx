import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>
        Shwoops! Not sure what happened there. Try going{" "}
        <Link href="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
