import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React from "react";

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

      <section className="w-full pt-36 pl-2 pr-2 md:pl-8 md:pr-8 relative flex flex-col items-center h-lvh lg:flex-row lg:justify-between lg:gap-[8rem] lg:relative">
        <div className="mb-10 lg:w-2/5 lg:relative lg:top-[-5rem] flex flex-col items-center lg:items-start">
          <div className="mb-4">
            <span className="text-6xl font-bold">Welcome to </span>
            <span
              className="relative pt-30 pb-2 min-[320px]:before:left-[-15rem] min-[608px]:before:left-[7rem]
            before:absolute before:left-[3rem] md:before:left-[7rem] lg:before:left-[-15rem] before:bottom-[16px] before:w-[200px] before:h-[15px] before:transform before:-skew-x-[12deg] before:-translate-x-1/2 before:bg-gradient-to-r from-teal-100 to-emerald-400 before:-z-10 text-6xl font-bold"
            >
              Quizzer
            </span>
          </div>

          <span className="text-md text-slate-600">
            Unleash Your Knowledge. Challenge Your Friends. Master the Game.
          </span>
        </div>

        <div className="mt-4 h-lvh w-full relative md:relative md:h-full md:w-full rounded-md drop-shadow-custom p-10">
          <Image
            src="/assets/dashboard.png"
            alt="dashboard"
            fill
            objectFit="cover"
            className="rounded-t-md md:rounded-md"
            quality={90}
            priority
          />
        </div>
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

      <section className="h-[70vh] md:h-[70vh] min-[900px]:h-lvh mt-24 relative flex flex-col items-center overflow-hidden">
        <span className="text-4xl font-bold text-center md:text-6xl">
          {" "}
          Tech stack used
        </span>
        <div className="flex flex-col md:flex-row md:overflow-hidden mt-12">
          <HeroSliderComponent />
        </div>
      </section>
    </>
  );
};

export default page;
