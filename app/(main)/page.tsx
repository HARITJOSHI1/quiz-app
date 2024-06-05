import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import React from "react";


export const maxDuration = 5;

const techStack = [
  {
    path: "/assets/mongo.png",
  },
  {
    path: "/assets/node.png",
  },
  {
    path: "/assets/reactjs.png",
  },
  {
    path: "/assets/ts.png",
  },
  {
    path: "/assets/mongoose.jpeg",
  },
  {
    path: "/assets/nextLogo.svg",
  },
  {
    path: "/assets/trpc.jpeg",
  },
];

const HeroSliderComponent = () => {
  return (
    <div className="flex overflow-hidden">
      {[1, 2].map((num) => {
        return (
          <div
            key={num}
            className="flex flex-col gap-8 items-center sm:flex-row sm:animate-marquee min-w-full justify-around w-10000 h-auto overflow-hidden"
          >
            {techStack.map((item, index) => {
              const { path } = item;
              return (
                <div className="h-[10rem] w-[10rem]" key={index}>
                  <div className="h-100">
                    <AspectRatio ratio={1 / 1} className="w-full">
                      <Image
                        src={path}
                        alt={`${path} logo`}
                        height={100}
                        width={300}
                        objectFit="cover"
                      />
                    </AspectRatio>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const page = async () => {
  return (
    <>
      <div className="w-full">
        <Image
          src="/assets/hero.svg"
          alt="hero svg"
          fill
          objectFit="cover"
          priority
        />
      </div>

      <section className="w-full pt-36 pl-4 lg:h-lvh pr-4 md:pl-2 md:pr-2 relative flex flex-col items-center md:h-[60vh] justify-center lg:gap-[8rem] lg:relative">
        <div className="mb-10 lg:w-full lg:relative lg:top-[-5rem] flex flex-col items-center">
          <div className="mb-4">
            <span className="text-5xl lg:text-8xl font-bold">Welcome to </span>
            <span className="relative pt-30 pb-2 text-5xl lg:text-8xl font-bold">
              QuizMaster
            </span>
          </div>

          <span className="text-md md:text-xl text-slate-600 text-wrap">
            Unleash Your Knowledge. Challenge Your Friends. Master the Game.
          </span>
        </div>

        {/* <div className="mt-4 h-lvh w-full relative md:relative md:h-full md:w-full rounded-md drop-shadow-custom p-10">
          <Image
            src="/assets/d2.png"
            alt="dashboard"
            fill
            objectFit="cover"
            className="rounded-t-md md:rounded-md"
            quality={90}
            priority
          />
        </div> */}
      </section>

      <section className="h-[70vh] md:h-[70vh] min-[900px]:h-lvh mt-36 relative">
        <div className="w-full h-full md:h-2/5">
          <Image
            src="/assets/cover.jpg"
            alt="dashboard"
            quality={99}
            fill
            objectFit="cover"
            priority
            className="object-cover w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)]"
          />

          <div className="absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.75)_36.82%,rgba(0,0,0,0.45)_81.44%)]" />
        </div>

        <div className="p-4 min-[900px]:p-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <span className="text-6xl md:text-8xl min-[900px]:text-9xl text-white font-bold block">
            Never stop, never give up.
          </span>

          <span className="min-[900px]:top-[90%] right-[4rem] md:right-[7rem] text-2xl italic absolute top-[110%] text-white md:text-4xl">
            By Harit Joshi
          </span>
        </div>
      </section>

      <section className="h-[auto] mb-20 md:h-[50vh] mt-24 relative flex flex-col items-center overflow-hidden">
        <span className="text-4xl font-bold text-center md:text-6xl">
          {" "}
          Tech stack used
        </span>
        <div className="flex flex-col md:flex-row md:overflow-hidden mt-12">
          <HeroSliderComponent />
        </div>
      </section>

      <footer className="bg-[#1e293b] text-white py-8">
        <div className="container mx-auto px-4 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">QuizMaster</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
          </nav>
          <p className="text-sm text-gray-400">
            &copy; 2024 Quiz App. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default page;
