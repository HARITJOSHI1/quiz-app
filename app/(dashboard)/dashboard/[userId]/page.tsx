import Link from "next/link";
import { JSX, SVGProps } from "react";
import ObjectId from "bson-objectid";
import { db } from "@/db";
import { UserDashboard } from "./_components/user-dashboard";
import { getUserPerformance } from "@/lib/actions";


export const dynamic = "force-dynamic" // revalidate at most every hour

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const performance = await getUserPerformance(params.userId);
  const allQuizzes = await db.quiz.findMany({
    where: { userId: params.userId },
  });
  const totalQuizAttemptedQuiz = performance.length;

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-[60px] items-center px-6">
          <Link
            href="#"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <Package2Icon className="h-6 w-6" />
            <span className="">Quiz Dashboard</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 hover:bg-gray-200"
              prefetch={false}
            >
              <LineChartIcon className="h-4 w-4" />
              Analytics
            </Link>

            <Link
              href={`/quiz/${ObjectId().toHexString()}/user/${params.userId}`}
              className="flex items-center gap-3 rounded-lg mt-3 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-200 cursor-pointer"
            >
              <TrophyIcon className="w-4 h-4  dark:text-gray-400" />
              Quiz
            </Link>
          </nav>
        </div>
      </div>

      <UserDashboard
        data={performance[0]}
        totalQuizAttemptedQuiz={totalQuizAttemptedQuiz}
        allQuizzes={allQuizzes}
      />
    </div>
  );
}

function LineChartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function Package2Icon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function TrophyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
