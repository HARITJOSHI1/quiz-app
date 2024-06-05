import Navigation from "@/app/_components/global/navigation";
import ClientClerkProvider from "@/providers/clerk-provider";
import { currentUser } from "@clerk/nextjs/server";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = async ({ children }: Props) => {
  const user = await currentUser();
  return (
    <main className="h-full">
      <ClientClerkProvider>
        <Navigation
          user={{
            name: user?.fullName!,
            email: user?.primaryEmailAddress?.emailAddress!,
            clerkUserId: user?.id!,
          }}
        />
        {children}
      </ClientClerkProvider>
    </main>
  );
};

export default layout;
