import Navigation from "@/components/global/navigation";
import { currentUser } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = async ({ children }: Props) => {
  return (
    <main className="h-full">
      <Navigation />
      {children}
    </main>
  );
};

export default layout;
