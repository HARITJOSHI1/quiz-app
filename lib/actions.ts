"use server";

import { db } from "@/db";
import { Answers, Quiz, User } from "@prisma/client";

export const createQuiz = async (quiz: Quiz) => {
  const alreadyQuizExists = await db.quiz.findUnique({
    where: { id: quiz.id },
  });

  if (alreadyQuizExists) return alreadyQuizExists;
  return await db.quiz.create({ data: quiz });
};

export const createOrGetUser = async (user: {
  name: string;
  email: string;
  clerkUserId: string;
}) => {
  const alreadyUser = await db.user.findUnique({
    where: { clerkUserId: user.clerkUserId },
  });

  if (alreadyUser) return alreadyUser;
  return await db.user.create({ data: user });
};

export const submitQuiz = async (query: Answers[], quizId: string) => {
  const ans = await db.answers.createMany({ data: query });

  const updateQuiz = await db.quiz.update({
    where: { id: quizId },
    data: {
      endTime: new Date(),
      status: "FINISHED",
    },
  });
  return updateQuiz;
};
