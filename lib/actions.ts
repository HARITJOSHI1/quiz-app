"use server";

import { db } from "@/db";
import { Answers, Quiz } from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const createQuiz = async (quiz: Quiz) => {
  const alreadyQuizExists = await db.quiz.findUnique({
    where: { id: quiz.id },
  });

  if (alreadyQuizExists) return alreadyQuizExists;
  return await db.quiz.create({ data: quiz });
};

export const getSingleQuizPerformance = async (quizId: string) =>
  await db.userPerformance.findUnique({
    where: { quizId },
    include: { Quiz: true },
  });

export const createOrGetUser = async (user: {
  name: string;
  email: string;
  clerkUserId: string;
}) => {
  try {
    console.log(
      "Searching already exist user user logged database instance",
      db
    );

    const alreadyUser = await db.user.findUnique({
      where: { clerkUserId: user.clerkUserId },
    });

    if (alreadyUser) return alreadyUser;

    console.log("Before creating a user");

    const newUser = await db.user.create({ data: user });
    console.log("Here is my user", newUser);

    return newUser;
  } catch (e) {
    if (
      e instanceof PrismaClientInitializationError ||
      e instanceof PrismaClientKnownRequestError ||
      e instanceof PrismaClientUnknownRequestError
    ) {
      console.log(
        "ERROR OUCCURED FROM PRISMA SIDE",
        e.name,
        e.message,
        e.cause
      );
    } else console.log("ERROR OUCCRED UNKNOWN", e);
  }
};

const analysizeAndSetScore = async (
  quizId: string,
  userId: string,
  scoreSet: { [q: string]: number },
  attempted: number
) => {
  const totalMarks = Object.values(scoreSet).reduce((prev, curr) => {
    prev += curr;
    return prev;
  }, 0);

  const prevScores = await db.userPerformance.findMany({ where: { userId } });
  const newAvgScore = totalMarks / 40;

  let totalAvgScore = 0;
  let prevAvgScore = 0;

  let highScore = Number.MIN_VALUE;
  let lowScore = Number.MAX_VALUE;

  if (prevScores.length) {
    prevScores.forEach((prev) => {
      prevAvgScore += prev.averageScore;
    });

    totalAvgScore = prevAvgScore + newAvgScore;

    prevScores.forEach(({ lowestScore, highestScore }) => {
      highScore = Math.max(highScore, highestScore);
      lowScore = Math.min(lowScore, lowestScore);
    });
  }

  const performance = await db.userPerformance.upsert({
    where: {
      quizId,
    },
    create: {
      score: totalMarks,
      averageScore: +totalAvgScore.toFixed(2),
      highestScore: Math.max(highScore, totalMarks),
      lowestScore: Math.min(lowScore, totalMarks),
      quizId,
      userId,
      attempted,
    },
    update: {
      score: totalMarks,
      averageScore: +totalAvgScore.toFixed(2),
      highestScore: Math.max(highScore, totalMarks),
      lowestScore: Math.min(lowScore, totalMarks),
      quizId,
      userId,
      attempted,
    },

    include: {
      Quiz: true,
    },
  });

  await db.quiz.update({
    where: { id: quizId },
    data: {
      endTime: new Date(),
      status: totalMarks < 18 ? "FAILED" : "PASS",
    },
  });

  return performance;
};

export const submitQuiz = async (
  query: Answers[],
  attempted: number,
  quizId: string,
  userId: string,
  scoreSet: { [q: string]: number }
) => {
  await db.answers.createMany({ data: query });

  const performance = await analysizeAndSetScore(
    quizId,
    userId,
    scoreSet,
    attempted
  );
  revalidatePath("/dashboard/[slug]", "page");
  return performance;
};

export const getUserPerformance = async (userId: string) => {
  return await db.userPerformance.findMany({
    where: { userId },
    orderBy: [{ highestScore: "desc" }, { lowestScore: "asc" }],
    include: { Quiz: true },
  });
};
