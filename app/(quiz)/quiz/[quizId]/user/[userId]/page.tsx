import { db } from "@/db";
import { Metadata } from "next";
import QuestionSection from "./_components/question-section";
import { createQuiz, createOrGetUser } from "@/lib/actions";
import ObjectId from "bson-objectid";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: {
    quizId: string;
    userId: string;
  };
};

export const metadata: Metadata = {
  title: "Start Quiz",
  description: "All the best",
};

export default async function page({ params }: Props) {
  const data = await db.question.findMany();
  const authUser = await currentUser();

  if (!authUser) return;

  const user = await createOrGetUser({
    name: authUser.fullName!,
    email: authUser.primaryEmailAddress?.emailAddress!,
    clerkUserId: authUser.id,
  });

  await createQuiz({
    id: params.quizId,
    endTime: null,
    status: "STARTED",
    userId: user.id,
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-20">
      <div className="grid gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {data.length} Question Quiz
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Test your knowledge with this fun and challenging quiz.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <QuestionSection
            data={data}
            quizId={params.quizId}
            userId={user.id}
          />
        </div>
      </div>
    </div>
  );
}
