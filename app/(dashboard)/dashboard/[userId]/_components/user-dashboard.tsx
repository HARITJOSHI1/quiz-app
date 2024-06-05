"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, cache, useEffect, useState } from "react";
import { AnalyticalData, SelectedQuiz } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Quiz } from "@prisma/client";
import clsx from "clsx";
import { getSingleQuizPerformance } from "@/lib/actions";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import BouncyLoadingPage from "@/components/global/bouncy-loading-page";
import { useRouter } from "next/navigation";
import ObjectID from "bson-objectid";

dayjs.extend(localizedFormat);

type Props = {
  data: AnalyticalData[0];
  totalQuizAttemptedQuiz: number;
  allQuizzes: Quiz[];
};

export const UserDashboard = ({
  data,
  totalQuizAttemptedQuiz,
  allQuizzes,
}: Props) => {
  const [selectedQuiz, setSelectedQuiz] = useState<{
    [quizId: string]: SelectedQuiz;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSelectedQuiz = async (quizId: string) => {
    console.log("Selected quiz ID:", quizId);

    if (selectedQuiz[quizId] || selectedQuiz[quizId] === null) return;

    setIsLoading(true);
    try {
      const quiz = await getSingleQuizPerformance(quizId);
      console.log("Fetched quiz:", quiz);

      const newQuizEntry = {
        [quizId]: quiz,
      };
      setSelectedQuiz({ ...newQuizEntry, ...selectedQuiz });
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(selectedQuiz);

  return (
    <div className="flex flex-col">
      <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6">
        <section
          id="analytics"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total quiz attempted
              </CardTitle>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalQuizAttemptedQuiz || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
              <TrophyIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.averageScore || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Highest Score
              </CardTitle>
              <StarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.highestScore || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Lowest Score
              </CardTitle>
              <FrownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.lowestScore || 0}</div>
            </CardContent>
          </Card>
        </section>
        <section id="quiz" className="grid gap-4">
          {!allQuizzes.length && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-3xl font-medium">
                  Quiz Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>No quizzes you have solved!</div>
              </CardContent>
            </Card>
          )}
          {allQuizzes.map((q, idx) => (
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="text-3xl font-medium hover:no-underline relative"
                  onClick={() => handleSelectedQuiz(q.id)}
                >
                  Quiz #{++idx}
                  <span
                    className={clsx(
                      "rounded-[5rem] px-5 text-[.7rem] absolute left-40",
                      {
                        "bg-red-200 text-red-600": q.status === "FAILED",
                        "bg-green-200  text-green-600": q.status === "PASS",
                        "bg-yellow-200  text-yellow-600":
                          q.status === "STARTED",
                      }
                    )}
                  >
                    {q.status}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <Card
                    className={clsx({
                      "flex flex-row justify-center items-center w-full":
                        isLoading,
                    })}
                  >
                    {isLoading ? (
                      <div className="w-5 h-15">
                        <BouncyLoadingPage />
                      </div>
                    ) : (
                      <>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-3xl font-medium">
                            Quiz Summary
                          </CardTitle>
                          <TrophyIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">
                                Your Score
                              </div>
                              <div
                                className={clsx("text-2xl font-bold ", {
                                  "text-green-500":
                                    selectedQuiz[q.id]?.Quiz.status === "PASS",

                                  "text-red-500":
                                    selectedQuiz[q.id]?.Quiz.status ===
                                    "FAILED",
                                })}
                              >
                                {selectedQuiz[q.id]?.score || selectedQuiz[q.id]?.score === 0 ? "0" : "N/A"}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">
                                Questions Answered
                              </div>
                              <div className="text-2xl font-bold">
                                {selectedQuiz[q.id]?.attempted || 0}/20
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">
                                Time Taken
                              </div>
                              <div className="text-xl">
                                {dayjs(selectedQuiz[q.id]?.Quiz.endTime).format(
                                  "DD/MM/YYYY, LT"
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">
                                Passing Score
                              </div>
                              <div className="text-2xl font-bold">45%</div>
                            </div>
                            <Button
                              className="w-full"
                              onClick={() =>
                                router.push(`/quiz/${q.id}/user/${q.userId}`)
                              }
                            >
                              {q.status === "STARTED"
                                ? "Finish test"
                                : "Retake Quiz"}
                            </Button>
                          </div>
                        </CardContent>{" "}
                      </>
                    )}
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </section>
      </main>
    </div>
  );
};

function BarChartIcon(
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronLeftIcon(
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FileQuestionIcon(
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
      <path d="M12 17h.01" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
    </svg>
  );
}

function FrownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
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

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
