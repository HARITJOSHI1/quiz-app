import { Prisma } from "@prisma/client";
import { getSingleQuizPerformance, getUserPerformance } from "./actions";

export type AnalyticalData = Prisma.PromiseReturnType<typeof getUserPerformance>
export type SelectedQuiz = Prisma.PromiseReturnType<typeof getSingleQuizPerformance>