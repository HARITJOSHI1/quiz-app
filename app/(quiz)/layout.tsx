import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default layout;
