import BouncyLoadingPage from "@/app/_components/global/bouncy-loading-page";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen">
      <BouncyLoadingPage />
    </div>
  );
};

export default loading;
