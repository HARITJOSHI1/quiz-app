"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ClientClerkProvider = ({ children }: Props) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClientClerkProvider;
