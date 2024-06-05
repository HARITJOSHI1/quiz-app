"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { createOrGetUser } from "@/lib/actions";
import { useRouter } from "next/navigation";

export type DBUserInfo = {
  user: {
    name: string;
    email: string;
    clerkUserId: string;
  };
};

const navMenu = ["Pricing", "About", "Documentation", "Features"];
const Navigation = ({ user }: DBUserInfo) => {
  const [showNavOpts, setShowNavOpts] = useState(false);
  const { name, email, clerkUserId } = user;
  const router = useRouter();

  return (
    <>
      <div className="p-4 border-b-2 border-b-slate-200 fixed top-0 left-0 right-0 z-20 flex items-center justify-between before:block before:w-full before:h-full before:absolute before:top-0 before:left-0 before:opacity-10 before:z-[-200] backdrop-blur-md bg-[rgba(255,255,255,0.8)]">
        <aside className="flex items-center gap-2">
          <svg
            id="logo-35"
            width="50"
            height="39"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
              className="ccompli1"
              fill="#007AFF"
            ></path>{" "}
            <path
              d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
              className="ccustom"
              fill="#312ECB"
            ></path>{" "}
          </svg>

          <span className="text-xl font-bold">QuizMaster</span>
        </aside>

        <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <ul className="flex items-center justify-center gap-8">
            {navMenu.map((menu, i) => (
              <Link href={"#"} key={i}>
                {menu}
              </Link>
            ))}
          </ul>
        </nav>

        <aside className="flex gap-2 items-center">
          <ChevronDown
            className="md:hidden cursor-pointer relative"
            onClick={() => setShowNavOpts(!showNavOpts)}
          />

          <SignedOut>
            <Link
              href={"/sign-in"}
              className="bg-teal-500 text-white p-2 px-7 rounded-md hover:bg-teal-600"
            >
              Signin
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{ elements: { avatarBox: "w-[40px] h-[40px]" } }}
            />
            <Button
              onClick={async () => {
                const user = await createOrGetUser({
                  name,
                  email,
                  clerkUserId,
                });
                router.push(`/dashboard/${user?.id}`);
              }}
              className="bg-teal-500 text-white p-2 px-7 rounded-md hover:bg-teal-600"
            >
              Dashboard
            </Button>
          </SignedIn>
        </aside>
      </div>

      {showNavOpts && (
        <div className="w-full fixed rounded-b-md drop-shadow-lg shadow-md mt-14 md:hidden z-50 before:block before:w-full before:h-full before:absolute before:top-0 before:left-0 before:opacity-10 before:z-[-200] backdrop-blur-md bg-[rgba(255,255,255,0.868)]">
          <ul className="flex flex-col justify-center w-100">
            {navMenu.map((menu, i) => (
              <Link
                key={i}
                href={"#"}
                className="w-full border-b-2 border-b-slate-300 p-4 text-center last:border-b-0 hover:bg-slate-200"
              >
                {menu}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navigation;
