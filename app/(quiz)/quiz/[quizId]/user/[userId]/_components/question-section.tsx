"use client";

import { Button } from "@/components/ui/button";
import { submitQuiz } from "@/lib/actions";
import { Answers, Question } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useOptimistic, useState } from "react";

type Props = {
  data: Question[];
  quizId: string;
  userId: string;
};

const QuestionSection = ({ data, quizId, userId }: Props) => {
  const [answers, setAnswers] = useState<{
    [id: string]: { final: Partial<Answers>; option: string };
  }>({});

  const [isSubmit, setIsSubmit] = useState(false);
  const [OSubmit, OSetSubmit] = useOptimistic(isSubmit);
  const [error, setError] = useState<{ message: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!OSubmit) return;
    const id = setTimeout(() => router.push(`/dashboard/${userId}`), 5000);

    return () => clearTimeout(id);
  }, [OSubmit]);

  const handleAnswers = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string
  ) => {
    const { value, name } = e.target;
    const [_, index, id] = name.split("-");
    const option = e.target.getAttribute("data-option")!;

    const answerState = {
      [index]: {
        final: {
          questionId,
          answerText: value,
          correctOptionIndex: +id,
          quizId,
        },
        option,
      },
    };

    setAnswers({ ...answers, ...answerState });
  };

  const handleSubmit = async () => {
    const query = Object.values(data).map((q, idx) => {
      if (!answers[idx + 1])
        return {
          answerText: "",
          correctOptionIndex: -1,
          questionId: q.id,
          quizId,
        };
      return answers[idx + 1].final;
    }) as Required<Answers>[];

    try {
      OSetSubmit(true);
      setIsSubmit(true);

      const updatedQuiz = await submitQuiz(query, quizId);
      if (updatedQuiz.status === "FINISHED") {
        setIsSubmit(true);
        setError(undefined);
        return;
      }
    } catch (e) {
      console.log(e);

      setIsSubmit(false);
      setAnswers({});
      setError({ message: "Something went wrong" });
    }
  };

  console.log(answers);

  return (
    <div className="max-h-[500px] overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center">
      <div className="grid gap-8">
        {data.map((d, index) => (
          <div key={index} className="grid gap-4">
            <div className="text-lg font-semibold">Question {index + 1}</div>
            <div className="grid gap-2">
              <div>{d.questionText}</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {d.options.map((opt, idx) => (
                  <label
                    className={clsx(
                      "flex items-center gap-2 p-3 rounded-md bg-gray-100 dark:bg-gray-800 cursor-pointer",

                      {
                        "text-green-400 border-2 border-green-400":
                          (OSubmit &&
                            idx ===
                              answers[index + 1]?.final.correctOptionIndex) ||
                          (OSubmit &&
                            !answers[index + 1] &&
                            idx === d.correctOptionIndex),

                        "text-red-500 border-2 border-red-500":
                          OSubmit &&
                          ((!answers[index + 1] &&
                            idx !== d.correctOptionIndex) ||
                            (idx === +answers[index + 1]?.option &&
                              +answers[index + 1]?.option !==
                                answers[index + 1]?.final.correctOptionIndex)),

                        "cursor-not-allowed": OSubmit,
                      }
                    )}
                  >
                    <input
                      type="radio"
                      disabled={OSubmit}
                      data-option={idx}
                      name={`question-${index + 1}-${d.correctOptionIndex}`}
                      value={opt}
                      onChange={(e) => {
                        handleAnswers(e, d.id);
                      }}
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="w-full bg-teal-500 text-white p-2 px-7 rounded-md hover:bg-teal-600 md:w-2/4 mt-10 text-lg mb-8"
        disabled={OSubmit}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      {OSubmit && !error && (
        <div className="w-full bg-green-400 text-white p-2 rounded-md">
          Answers submitted. You will be redirected to your dashboard in 5
          seconds.
        </div>
      )}

      {error && (
        <div className="w-full bg-red-500 text-white p-2 rounded-md">
          {error?.message}
        </div>
      )}
    </div>
  );
};

export default QuestionSection;
