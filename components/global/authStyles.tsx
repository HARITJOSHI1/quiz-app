import Image from "next/image";
import React, { ReactNode, Suspense } from "react";
import { ScrollArea } from "../ui/scroll-area";
import BouncyLoadingPage from "./bouncy-loading-page";

type Props = {
  children: ReactNode;
};

const AuthStyles = ({ children }: Props) => {
  return (
    <ScrollArea>
      <div className="flex flex-row h-screen justify-center items-center bg-teal-200">
        <div className="flex flex-col w-auto h-auto  bg-white border-black rounded-lg md:flex md:flex-row md:w-10/12 md:p-4 md:justify-between drop-shadow-md shadow-lg">
          <div className="h-48 w-full relative md:relative md:w-7/12 md:h-auto">
            <Image
              src="/assets/entry.jpg"
              alt="Random image"
              fill
              objectFit="cover"
              className="rounded-t-md md:rounded-md"
              priority
            />
          </div>
          <Suspense
            fallback={
              <div className="w-5 h-15">
                <BouncyLoadingPage />
              </div>
            }
          >
            <div>{children}</div>
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AuthStyles;
