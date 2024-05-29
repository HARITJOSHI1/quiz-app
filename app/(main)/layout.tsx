import Navigation from "@/components/navigation";
import { currentUser } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = async ({ children }: Props) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default layout;
